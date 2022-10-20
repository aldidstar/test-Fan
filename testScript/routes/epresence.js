var express = require("express");
var router = express.Router();
var models = require("../models/index");
const helpers = require("../helpers/util");
var moment = require("moment");
var jwt = require("jsonwebtoken");
var { Op } = require("sequelize");
moment.suppressDeprecationWarnings = true;

// insert data
router.post("/presence", helpers.verifyToken, async function (req, res) {
  const userId = req.userId;
  const now = new Date();
  const checkEpresence = await models.Epresence.findOne({
    where: {
      type: req.body.type,
      userId,
    },
    order: [["waktu", "DESC"]],
  });

  if (
    !checkEpresence ||
    moment(checkEpresence.dataValues.waktu).format("MM-DD-YYYY") !==
      moment(now).format("MM-DD-YYYY")
  ) {
    await models.Epresence.create({
      userId,
      type: req.body.type,
      is_approve: null,
      waktu: moment(now).format("MM-DD-YYYY hh:mm"),
    })
      .then(function (user) {
        res.status(201).json({ user });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  } else {
    return res.json({
      message: `User sudah melakukan ${req.body.type}`,
    });
  }
});

// GET presence listing.
router.get("/data", helpers.verifyToken, function (req, res, next) {
  models.Epresence.findAll({
    order: [["id", "ASC"]],
    include: [
      {
        association: "User",
        attributes: ["nama"],
      },
    ],
  })
    .then(function (data) {
      return res.json({
        message: "Success get data",
        data: data.map((datas) => {
          const container = {};
          container["id"] = datas.dataValues.id;
          container["userId"] = datas.dataValues.userId;
          container["tanggal"] = moment(datas.dataValues.waktu).format(
            "MM-DD-YYYY"
          );
          container["name_user"] = datas.dataValues.User.dataValues.nama;
          if (datas.dataValues.type == "IN") {
            container["waktu_masuk"] = moment(datas.dataValues.waktu).format(
              "hh:mm:ss"
            );
            datas.dataValues.is_approve == true
              ? (container["status_masuk"] = "APPROVE")
              : datas.dataValues.is_approve == false
              ? (container["status_masuk"] = "REJECT")
              : (container["status_masuk"] = "NOT CONFIRM");
          }
          if (datas.dataValues.type == "OUT") {
            container["waktu_pulang"] = moment(datas.dataValues.waktu).format(
              "hh:mm:ss"
            );
            datas.dataValues.is_approve == true
              ? (container["status_masuk"] = "APPROVE")
              : datas.dataValues.is_approve == false
              ? (container["status_masuk"] = "REJECT")
              : (container["status_masuk"] = "NOT CONFIRM");
          }
          container["type"] = datas.dataValues.type;

          return container;
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

// approve presence
router.put("/approve", helpers.verifyToken, async function (req, res) {
  const spv = await models.User.findOne({
    where: {
      id: req.userId,
    },
  });
  const employee = await models.User.findOne({
    where: {
      id: req.body.userId,
    },
  });

  const checkEpresence = await models.Epresence.findOne({
    where: {
      userId: req.body.userId,
    },
    order: [["waktu", "DESC"]],
  });

  if (
    !checkEpresence ||
    (spv.dataValues.npp == employee.dataValues.npp_supervisor &&
      checkEpresence.dataValues.is_approve == null)
  ) {
    models.Epresence.update(
      { is_approve: req.body.is_approve },
      {
        where: {
          [Op.and]: [{ userId: req.body.userId }, { is_approve: null }],
        },
        order: [["waktu", "ASC"]],
      }
    ).then(function () {
      if (req.body.is_approve === "true") {
        return res.json({
          message: "Approve success",
        });
      } else {
        return res.json({
          message: "Approve reject",
        });
      }
    });
  } else {
    return res.json({
      message: "Anda bukan supervisor / sudah melakukan approve",
    });
  }
});

module.exports = router;
