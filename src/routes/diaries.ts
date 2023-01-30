import express from "express"

import * as diaryServices from '../services/diaryServices'

import toNewDiaryentry from "../utilis"

const router = express.Router()

router.get('/', (_req,res)=>{
    res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req,res)=>{
    const diary = diaryServices.findById(+req.params.id)    
    return diary ? res.send(diary) : res.sendStatus(404)
})


router.post('/', (req,res)=>{
    try{       
        const newDiaryEntry = toNewDiaryentry(req.body);
        const addedDiaryEntry = diaryServices.addDairy(newDiaryEntry)
        res.json(addedDiaryEntry)
    }catch (e:any) {
        res.status(400).send(e.message)
    }   
})

export default router