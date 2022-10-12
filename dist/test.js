"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
const puppies = [
    {
        id: 1,
        breed: 'Corgi',
        name: 'Medi Jr',
        birthdate: '1995-11-09'
    },
    {
        id: 2,
        breed: 'Shiba',
        name: 'Johannes',
        birthdate: '1994-11-01'
    },
];
describe('Testing api endpoint', () => {
    test('sanity check for /test', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/api/puppies');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(puppies);
    });
});
//# sourceMappingURL=test.js.map