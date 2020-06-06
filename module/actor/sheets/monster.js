import ActorSheetSS2e from './base.js'
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @ext'../../dice.js't}
 */
export class ActorSheetSS2eMonster extends ActorSheetSS2e {
  /** @override */
  static get defaultOptions () {
    return mergeObject(super.defaultOptions, {
      classes: ['svnsea2e', 'sheet', 'actor'],
      template: 'systems/svnsea2e/templates/actors/monster.html',
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
  _prepareMonsterItems (data) {
    const actorData = data.actor

    // Initialize containers.
    const advantages = []

    // Iterate through items, allocating to containers
    // let totalWeight = 0
    for (const i of data.items) {
      const item = i.data

      // Append to item types to their arrays
      if (i.type === 'advantage') {
        advantages.push(i)
      }
    }

    // Assign and return
    actorData.advantages = advantages
  }
}
