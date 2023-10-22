import { NextFunction, Request, Response } from "express";
import Express from 'express';
import { Project } from '../models/projectModel';
import axios from "axios";
import OpenAI from 'openai';
import fs from 'fs';
const router = Express.Router();
const openai = new OpenAI({ apiKey: "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" });



router.get('/', (req: Request, res: Response, _next: NextFunction) => {
    Project.find().then(response => {
        res.status(200).send(response);
    }, (err) => _next(err))
}).
    post('/addProject', (req: Request, res: Response, _next: NextFunction) => {
        const newProject = new Project({ ...req.body })
        newProject.save(req.body).then(response => {
            res.statusCode = 200;
            res.send("Project has been added");
        })
    }).
    post('/addProjectList', async (req: Request, res: Response, _next: NextFunction) => {
        const arr = [];
        req.body.map(project => {
            const newProject = new Project({ ...project })
            newProject.save(req.body).then(response => {
                arr.push(project.Title + 'added')
            })
        })
        res.statusCode = 200;
        res.send("List Added");
    }).
    post('/query', async (req: Request, res: Response, _next: NextFunction) => {
        const query = req.body.query;
        const prompt = fs.readFileSync(__dirname + '/ai-promt.template', 'utf-8');

        const smartSearch = async (query: string) => {
            try {
                const response = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ "role": "system", "content": prompt },
                    { "role": "user", "content": query }],
                    temperature: 0,
                    max_tokens: 1000,
                    stop: [" H:", " AI:"],
                })

                const interpretedQuery = response.choices[0].message.content;
                return JSON.parse(interpretedQuery);
            } catch (error) {
                return query; // Fallback to the original query in case of an error
            }
        };

        const result = await smartSearch(query);
        const response_ = await Project.find(result?.query?.find);
        res.send({ queryRes: result, result: response_ });
    })

export default router;
