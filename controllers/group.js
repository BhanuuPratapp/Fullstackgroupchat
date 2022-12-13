
const express = require('express')
const { Sequelize, Op } = require("sequelize");
//const messagetable =require('../models/messages')
const grouptable= require('../models/groups')
const usergroups = require('../models/usergroups')
const user = require('../models/user')


exports.creategroup = async function (req, res) {
    try
    {
  const gpname = req.body.groupname;

  await grouptable.create({

    groupname: gpname,

  });

  grouptable
    .findAll({ where: { groupname: gpname } })

    .then((group) => {

      const gid = group[0].id;
      const uid = req.user.id;

      usergroups
        .create({

          is_admin: true,
          GroupId: gid,
          forsignupId: uid,

        })
        .then(() => {

          res.json({ success: "true" });

        });
    })
    .catch((err) => console.log(err));
}

catch(err)
{

    console.log("Error:", err);
    res.status(500).json({Error: err})

}
};


exports.getgroups = async function (req, res) {

    try{

    const uid = req.user.id;
    let gpids = [];

    usergroups
      .findAll({ where: { forsignupId: uid } })
  
      .then((groups) => {

        for (let i = 0; i < groups.length; i++)
         {

          gpids.push(groups[i].GroupId);

        }
        grouptable
          .findAll({ where: { id: { [Op.or]: gpids } } })
          .then((usergroups) => {
            res.json({ usergps: usergroups });
          });
      })
      .catch((err) => console.log(err));
    }
    catch(err)
    {
        console.log("Error:", err);
        res.status(500).json({Error: err})
    }
  };

  exports.addusertogroup = async function (req, res) {
    try{
    const uid = req.user.id;

    const newuser = req.body.addingemail;

    const gid = req.body.groupid;

    const makeadmin = req.body.makeadmin;

    var adduserid;

    user
      .findAll({ where: { email: newuser } })

      .then((adduser) => {

        adduserid = adduser[0].id;

      })
      .catch((err) => {

        res.json({ message: "usernotfound" });

      });
  
    usergroups
      .findAll({ where: { forsignupId: uid, GroupId: gid } })
  
      .then((user) => {

        if (user[0].is_admin) {

          if (makeadmin == "on") {

            usergroups.create({

              is_admin: true,
              GroupId: gid,
              forsignupId: adduserid,

            });
          } else {

            usergroups.create({
              is_admin: false,
              GroupId: gid,
              forsignupId: adduserid,

            });
          }
        }
        res.json({ success: "true" });
      })
      .catch((err) => console.log(err));
    }
    catch(err)
    {
        console.log("Error:", err);
        res.status(500).json({Error: err})
    }
  };

  exports.removeuserfromgroup = async function (req, res) {
    try{
    const uid = req.user.id;

    const rmuser = req.body.rmemail;

    const gid = req.body.rmgroupid;

    var rmuserid;

    user
      .findAll({ where: { email: rmuser } })

      .then((adduser) => {

        rmuserid = adduser[0].id;

      })
      .catch((err) => {

        res.json({ message: "usernotfound" });

      });

    usergroups
      .findAll({ where: { forsignupId: uid, GroupId: gid } })
  
      .then((user) => {

        if (user[0].is_admin) {

          usergroups.destroy({where:{

            GroupId: gid,
            forsignupId: rmuserid,

          }}).then(()=>{

              res.json({message:"success"})
              
          })
        }
      })
      .catch((err) => console.log(err));
    }
    catch(err)
    {
        console.log("Error:", err);
        res.status(500).json({Error: err})
    }
  };