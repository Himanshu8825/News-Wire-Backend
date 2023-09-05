const express = require('express');
const router = express.Router();

const News = require('../models/news');
const {sendEmail} = require('../config/email');

router.get('/news', async (req,res) => {
    try {
        const news = await News.find();
        res.json(news); /* for sending the files to another port we prefer res.json() */
    } catch (error) {
        console.log(error);
    }
});
// router.get('/news/new', async (req,res)=>{}); as this new pages will be done on frontend port so skipped here
router.post('/news', async (req,res)=>{
    try {
        const newNews = new News(req.body.news);
        await newNews.save();
        res.json('ok'); /* there is no need to send any response here for react frontend */
    } catch (error) {
        console.log(error);
    }
});
router.get('/news/:id', async (req,res)=>{
    try {
        const news = await News.findById(req.params.id);
        res.json(news);
    } catch (error) {
        console.log(error);
    }
});
router.get('/news/:id/edit', async (req,res)=>{
    try {
        const news = await News.findById(req.params.id);
        res.json(news);
    } catch (error) {
        console.log(error);
    }
});
router.patch('/news/:id', async (req,res)=>{
    try {
        await News.findByIdAndUpdate(req.params.id, req.body.news);
        res.json('ok');
    } catch (error) {
        console.log(error);
    }
});
router.delete('/news/:id', async (req,res)=>{
    try {
        await News.findByIdAndRemove(req.params.id);
        res.json('ok');
    } catch (error) {
        console.log(error);
    }
});

router.post('/contact', async(req,res) => {
    try {
        console.log(req.body);
        const userObj = {
            email:req.body.email,
            subject:req.body.subject,
            content:req.body.content,
        }
        await sendEmail(userObj);
        res.json('ok');
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;