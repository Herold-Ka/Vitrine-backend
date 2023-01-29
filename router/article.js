const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { Op, where } = require("sequelize");


router.post("/newArticle", (req, res) => {
    let image = req.body.image;
    db.article.findOne({
        where: {title: req.body.title}
    })
    .then((article) => {
        if(!article){
            db.article.create(req.body)
            .then((itemArticle) => {
                db.image.create({
                    image: image,
                    articleId: itemArticle.id,
                })
                .then(() => {
                    db.media.create({
                        media: media,
                        articleId: itemArticle.id
                    })
                    .then(() => {
                        db.article.findOne({
                            where: {id: itemArticle.id},
                            include: [
                                {
                                    model: db.image
                                },
                                {
                                    model: db.media,
                                }
                            ],
                        })
                        .then((article) => {
                            res.json(200).json({article: article});
                        })
                        .catch((err) => {
                            res.json(502).json(err);
                        })
                    })
                    .catch((err) => {
                        res.json(502).json(err)
                    })
                })
                .catch((err) => {
                    res.json(502).json(err)
                })
            })
            .catch((err) => {
                res.json(502).json(err)
            })
        }
    })
    .catch((err) => {
        res.json(502).json(err)
    })
});
module.exports = router