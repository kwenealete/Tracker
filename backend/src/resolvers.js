const bycrypt = require('bcryptjs');

const resolvers =  {
    User: {
        measurements: (parent, args, context, info) => parent.getMeasurements()
    },

    Measurements: {
        user: (parent, args, context, info) => parent.getUser()
    },

    Query: {
        measurement: (parent, { id }, { models }, info) => models.Measurements.findByPk(id),
        measurements: (parent, args, { models }, info) => models.Measurements.findAll(),
        user: (parent, { id }, { models }, info) => models.User.findByPk(id),
        users: (parent, args, { models }, info) => models.User.findAll()
    },

    Mutation: {
        createUser: async(parent, { firstName, lastName, email, password}, { models }, info) =>
            models.User.create({
                firstName,
                lastName,
                email,
                password: await bycrypt.hash(password, 10)
            }),

        createMeasurement :(parent, { UserId, weight }, { models }, info) =>
            models.Measurements.create({
                UserId,
                weight
            }),

        updateMeasurement: (parent, { id, weight}, { models }, info) => 
            models.Measurements.update({
                
                weight
            },
            {
                where: { id: id }
            }),
        deleteMeasurement: (parent, { id }, { models }, info) =>
            models.Measurements.destroy({
                where: { id: id }
            })
    }
};

module.exports = resolvers;