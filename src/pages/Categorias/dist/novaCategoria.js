"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var Titulos_1 = require("../../components/Titulos");
var react_toastify_1 = require("react-toastify");
var api_1 = require("../../services/api");
var AuthContext_1 = require("../../contexts/AuthContext");
var styles_1 = require("../Dashboard/styles");
var MainHeader_1 = require("../../components/MainHeader");
var Aside_1 = require("../../components/Aside");
var styles_2 = require("./styles");
var Button_1 = require("../../components/ui/Button");
var Voltar_1 = require("../../components/Voltar");
var InputPost_1 = require("../../components/ui/InputPost");
var styles_3 = require("../../components/Content/styles");
var NovaCategoria = function () {
    var user = react_1.useContext(AuthContext_1.AuthContext).user;
    var _a = react_1.useState(''), categoryName = _a[0], setCategoryName = _a[1];
    var _b = react_1.useState(''), codigo = _b[0], setCodigo = _b[1];
    var _c = react_1.useState(user.loja_id), lojaID = _c[0], setLojaID = _c[1];
    function removerAcentos(s) {
        return s.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/ +/g, "-")
            .replace(/-{2,}/g, "-")
            .replace(/[/]/g, "-");
    }
    function handleRegisterCategory() {
        return __awaiter(this, void 0, void 0, function () {
            var apiClient, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (categoryName === '') {
                            react_toastify_1.toast.error('Digite algum nome para sua categoria!');
                            return [2 /*return*/];
                        }
                        if (codigo === '') {
                            react_toastify_1.toast.error('Digite o codigo para sua categoria!');
                            return [2 /*return*/];
                        }
                        if (lojaID === null) {
                            react_toastify_1.toast.error('Cadastre os dados da sua loja antes de cadastrar uma categoria!');
                            return [2 /*return*/];
                        }
                        apiClient = api_1.setupAPIClient();
                        return [4 /*yield*/, apiClient.post('/category', {
                                categoryName: categoryName.replace(/[/]/g, "-"),
                                codigo: removerAcentos(codigo),
                                loja_id: lojaID
                            })];
                    case 1:
                        _a.sent();
                        react_toastify_1.toast.success('Categoria cadastrada com sucesso!');
                        setCategoryName('');
                        setCodigo('');
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    return (react_1["default"].createElement(styles_1.Grid, null,
        react_1["default"].createElement(MainHeader_1["default"], null),
        react_1["default"].createElement(Aside_1["default"], null),
        react_1["default"].createElement(styles_2.Container, null,
            react_1["default"].createElement(styles_3.Card, null,
                react_1["default"].createElement(Voltar_1["default"], { url: '/categorias' }),
                react_1["default"].createElement(styles_2.BlockTop, null,
                    react_1["default"].createElement(Titulos_1["default"], { tipo: "h1", titulo: "Nova Categoria" }),
                    react_1["default"].createElement(Button_1.Button, { type: "submit", style: { backgroundColor: 'green' }, onClick: handleRegisterCategory }, "Salvar")),
                react_1["default"].createElement(styles_2.Block, null,
                    react_1["default"].createElement(styles_2.Etiqueta, null, "Nome:"),
                    react_1["default"].createElement(InputPost_1.InputPost, { type: "text", placeholder: "Digite o nome da categoria", value: categoryName, onChange: function (e) { return setCategoryName(e.target.value); } })),
                react_1["default"].createElement(styles_2.Block, null,
                    react_1["default"].createElement(styles_2.Etiqueta, null, "C\u00F3digo:"),
                    react_1["default"].createElement(InputPost_1.InputPost, { type: "text", placeholder: "Digite o c\u00F3digo", value: codigo, onChange: function (e) { return setCodigo(e.target.value); } }))))));
};
exports["default"] = NovaCategoria;
