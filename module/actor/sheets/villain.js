import ActorSheetSS2e from './base.js'
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @ext'../../dice.js't}
 */
export class ActorSheetSS2eVillain extends ActorSheetSS2e {
  /** @override */
  static get defaultOptions () {
    return mergeObject(super.defaultOptions, {
      classes: ['svnsea2e', 'sheet', 'actor', 'villain'],
      template: 'systems/svnsea2e/templates/actors/villain.html',
      tabs: [{
        navSelector: '.sheet-tabs',
        contentSelector: '.sheet-body',
        initial: 'traits'
      }]
    })
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareVillainItems (sheetData, baseData) {
    const actorData = baseData.actor

    // Initialize containers.
    const advantages = []
    const artifacts = []
    const sorcery = []
    const schemes = []

    // Iterate through items, allocating to containers
    // let totalWeight = 0
    for (const i of baseData.items) {
      const item = i.data

      // Append to item types to their arrays
      if (i.type === 'advantage') {
        advantages.push(i)
      } else if (i.type === 'sorcery') {
        sorcery.push(i)
      } else if (i.type === 'scheme') {
        schemes.push(i)
      } else if (i.type === 'artifact') {
        artifacts.push(i)
      }
    }

    // Assign and return
    sheetData.advantages = advantages
    sheetData.age = baseData.actor.data.data.age
    sheetData.arcana = baseData.actor.data.data.arcana
    sheetData.artifacts = artifacts
    sheetData.concept = baseData.actor.data.data.concept
    sheetData.dwounds = baseData.actor.data.data.dwounds
    sheetData.hubris = baseData.actor.data.data.hubris
    sheetData.nation = baseData.actor.data.data.nation
    sheetData.redemption = baseData.actor.data.data.redemption
    sheetData.religion = baseData.actor.data.data.religion
    sheetData.reputation = baseData.actor.data.data.reputation
    sheetData.schemes = schemes
    sheetData.sorcery = sorcery
    sheetData.villainy = baseData.actor.data.data.villainy
    sheetData.virtue = baseData.actor.data.data.virtue
    sheetData.wounds = baseData.actor.data.data.wounds
  }
}
