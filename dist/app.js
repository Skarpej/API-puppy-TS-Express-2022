"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/api/puppies', async (_req, res) => {
    const allPuppies = await (0, db_1.getAllPuppies)();
    return res.json(allPuppies);
});
app.get('/api/puppies/:id', async (req, res) => {
    const onePuppy = await (0, db_1.getOnePuppy)(req.params.id);
    return res.json(onePuppy);
});
app.post('/api/puppies', async (req, res) => {
    const newPuppy = await (0, db_1.createOnePuppy)(req.body);
    return res.status(201).json(newPuppy);
});
app.put('/api/puppies/:id', async (req, res) => {
    const updatedPuppy = await (0, db_1.updateOnePuppy)(req.params.id, req.body);
    return res.json(updatedPuppy);
});
app.delete('/api/puppies/:id', async (req, res) => {
    await (0, db_1.deleteOnePuppy)(req.params.id);
    return res.sendStatus(204);
});
exports.default = app;
//# sourceMappingURL=app.js.map