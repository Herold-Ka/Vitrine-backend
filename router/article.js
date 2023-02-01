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
                            res.status(200).json({article: article});
                        })
                        .catch((err) => {
                            res.status(502).json(err);
                            console.log('ici')
                        })
                    })
                    .catch((err) => {
                        res.status(502).json(err)
                        console.log('hop')
                    })
                })
                .catch((err) => {
                    res.status(502).json(err)
                    console.log('nite')
                })
            })
            .catch((err) => {
                res.status(502).json(err)
                console.log('hola')
            })
        }
    })
    .catch((err) => {
        res.status(502).json(err)
        console.log('lol')
    })
});

router.get("/nbArticlePageArticle/:limit", (req, res) => {
    db.article
        .findAll({
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: db.image,
            }, ],
            limit: parseInt(req.params.limit),
        })

    .then((articles) => {
            res.status(200).json({ articles: articles });
        })
        .catch((err) => {
            res.status(502).json("bad req" + err);
        });
});
module.exports = router