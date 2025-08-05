'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const achievements = [
      // Progreso
      {
        title: 'Primer Paso',
        description: 'Completar tu primera actividad',
        icon: '🚶‍♂️',
        category: 'progress',
        requirementType: 'activities_completed',
        requirementValue: 1,
        rewardType: 'coins',
        rewardValue: '10',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Sumador',
        description: 'Completar 10 actividades de aritmética',
        icon: '➕',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 10,
        mathTopic: 'aritmetica',
        rewardType: 'coins',
        rewardValue: '40',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Algebrista',
        description: 'Completar 10 actividades de álgebra',
        icon: '🧮',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 10,
        mathTopic: 'algebra',
        rewardType: 'coins',
        rewardValue: '40',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Geómetra',
        description: 'Completar 10 actividades de geometría',
        icon: '📐',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 10,
        mathTopic: 'geometria',
        rewardType: 'coins',
        rewardValue: '40',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Trigonometrista',
        description: 'Completar 10 actividades de trigonometría',
        icon: '📏',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 10,
        mathTopic: 'trigonometria',
        rewardType: 'coins',
        rewardValue: '40',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Razonador',
        description: 'Completar 10 actividades de razonamiento matemático',
        icon: '🧠',
        category: 'math',
        requirementType: 'math_topic',
        requirementValue: 10,
        mathTopic: 'razonamiento_matematico',
        rewardType: 'coins',
        rewardValue: '40',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('achievements', achievements, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('achievements', null, {});
  }
};