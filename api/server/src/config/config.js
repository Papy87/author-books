
const DB_CONFIG = {
    development: {
        database: 'books',
        username: 'postgres',
        password: '312205',
        host: '127.0.0.1',
        port: '5432',
        dialect: 'postgres',
        define: {
            timestamps: false,
            freezeTableName: true
        },
        dialectOption: {
            ssl: false,
            native: true
        },
        logging: false
    },
    test: {
        database: 'book',
        username: 'postgres',
        password: 'postgres',
        host: 'localhost',
        dialect: 'postgres'
    },
};
const DB_SECRET = "HMeuwN4kLhYI5UXa39w5WU.EK?3j=ihY!LDZALUc8bqi.=Djak3Xqu6Z4zgr3zJfYJVFaCotHHDORN.kUgj1tnrE5jpkvxAFY93fEC5.1FygTo1PW0WeRvoctMk.PyajcpdPC6PDk0KhoQEAJ34jQ2GuMc1JyfvmfDL5tCxKCGMy0SnKVqXDN.lRRNyqlk0dgP6Z0Zz=w5vVYjZF1NgvFSK?adqGoDqRu4cnPCAyvRzRI6o9X!UhW0CissLbVfF3i!D?ZrBAo2Qxw=Ujgb=V?M!e6rmH1ciLt2WLR8tnEzoiFvUUjL16qdtvmE1rX7KqZJAizAu9y36w.IHs41aVLs?qTAjkpnYlhOAUSX8EzXoyx3!bed1x5.?6u!ZYEPl2dksY5ns0RFGOGkiZdT!Ku0t7I0AEgVJqPvgvBFDEK2!WrJypl?d6NohvjtvaH8ditwgftvozJEoha5oDf5anv!E3nBoi5Y?13cwT12BNPR2FyHLbemCbSOqZ6!8oMQfE";

module.exports = {
    DB_CONFIG,
    DB_SECRET
}
