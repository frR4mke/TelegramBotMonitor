"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrices = void 0;
const rest_1 = require("../rest/rest");
const typescript_collections_1 = require("typescript-collections");
async function getPrices(model) {
    return (0, rest_1.readBodyFrom)(`https://www.pleer.ru/search_iphone+${model}_1-61,2-0,7-(88),3-(),4-(),5-0,8-0,9-0,6-7.html`)
        .then(response => {
        const root = response;
        if (root) {
            const _item_names = root.querySelectorAll('.pad_r');
            const _urls = _item_names.map(x => x.querySelector('a')).map(x => x.rawAttributes);
            const _prices = root.querySelectorAll('.product_price_color1');
            const item_names = _item_names.map(x => x.structuredText);
            const prices = _prices.map(x => x.structuredText);
            const r = new typescript_collections_1.Dictionary();
            const not_available = 'Нет в наличии';
            for (let index = 0; index < item_names.length; index++) {
                const name = item_names[index];
                const price = prices[index];
                const url = _urls[index].href;
                const _m = {
                    price: price !== null && price !== void 0 ? price : not_available,
                    url: url
                };
                r.setValue(name, _m);
            }
            let message = '';
            for (let index = 0; index < r.keys().length; index++) {
                const key = r.keys()[index];
                let value = r.getValue(key);
                if (value === null || value === void 0 ? void 0 : value.price) {
                    if (value.price != not_available) {
                        value.price = value.price.substring(0, value.price.indexOf('руб.'));
                    }
                }
                if (value === null || value === void 0 ? void 0 : value.url) {
                    value.url = 'https://www.pleer.ru/' + value.url;
                }
                message +=
                    'НАИМЕНОВАНИЕ: ' + key +
                        '\n' +
                        'ССЫЛКА ' + (value === null || value === void 0 ? void 0 : value.url) +
                        '\n' +
                        'ЦЕНА: ' + (value === null || value === void 0 ? void 0 : value.price);
                //     'ЦЕНА: ' + value?.price; +
                //     '\n' +
                //    ;
                message += '\n';
                message += '\n';
            }
            return message;
        }
    });
}
exports.getPrices = getPrices;
//# sourceMappingURL=pleerparser.js.map