'use strict';

module.exports = {
    up(queryInterface, Sequelize) {

        return queryInterface.bulkInsert('Stickers', [
            {
                title: 'Cabo de Peñas',
                description: 'Sitio más septentrional de Asturias. Y el segundo más visitado.',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Faro de Peñas',
                description: 'Faro que se encuentra en el Cabo con el mismo nombre.',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down(queryInterface, Sequelize) {

        return queryInterface.bulkDelete('Stickers', null, {});
    }
};