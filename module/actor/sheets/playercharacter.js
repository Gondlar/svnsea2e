import ActorSheetSS2e from './base.js'
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @ext'../../dice.js't}
 */
export class ActorSheetSS2ePlayerCharacter extends ActorSheetSS2e {
  /** @override */
  static get defaultOptions () {
    return mergeObject(super.defaultOptions, {
      classes: ['svnsea2e', 'sheet', 'actor', 'pc'],
      template: 'systems/svnsea2e/templates/actors/playercharacter.html',
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
  _prepareCharacterItems (sheetData, baseData) {

    // Update skill labels
    sheetData.skills = {}
    for (const [s, skl] of Object.entries(baseData.actor.data.data.skills)) {
      sheetData.skills[s] = skl
      sheetData.skills[s].label = CONFIG.SVNSEA2E.skills[s]
    }

    // Initialize containers.
    const advantages = []
    const backgrounds = []
    const sorcery = []
    const secretsocieties = []
    const stories = []
    const duelstyles = []
    const artifacts = []

    // Iterate through items, allocating to containers
    // let totalWeight = 0
    for (const i of baseData.items) {
      // Append to item types to their arrays
      if (i.type === 'advantage') {
        advantages.push(i)
      } else if (i.type === 'background') {
        backgrounds.push(i)
      } else if (i.type === 'sorcery') {
        sorcery.push(i)
      } else if (i.type === 'secretsociety') {
        secretsocieties.push(i)
      } else if (i.type === 'story') {
        stories.push(i)
      } else if (i.type === 'duelstyle') {
        duelstyles.push(i)
      } else if (i.type === 'artifact') {
        artifacts.push(i)
      }
    }

    // Assign and return
    sheetData.advantages = advantages
    sheetData.age = baseData.actor.data.data.age
    sheetData.arcana = baseData.actor.data.data.arcana
    sheetData.artifacts = artifacts
    sheetData.backgrounds = backgrounds
    sheetData.concept = baseData.actor.data.data.concept
    sheetData.corruptionpts = baseData.actor.data.data.corruptionpts
    sheetData.duelstyles = duelstyles
    sheetData.dwounds = baseData.actor.data.data.dwounds
    sheetData.heropts = baseData.actor.data.data.heropts
    sheetData.hubris = baseData.actor.data.data.hubris
    sheetData.nation = baseData.actor.data.data.nation
    sheetData.redemption = baseData.actor.data.data.redemption
    sheetData.religion = baseData.actor.data.data.religion
    sheetData.reputation = baseData.actor.data.data.reputation
    sheetData.sorcery = sorcery
    sheetData.secretsocieties = secretsocieties
    sheetData.stories = stories
    sheetData.virtue = baseData.actor.data.data.virtue
    sheetData.wealth = baseData.actor.data.data.wealth
    sheetData.wounds = baseData.actor.data.data.wounds
  }
}
