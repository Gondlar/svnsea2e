import {
  SVNSEA2E
} from '../../config.js'

import {
  ItemSheetSS2e
} from './base.js'

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class ItemSheetSS2eBackground extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions () {
    return mergeObject(super.defaultOptions, {
      template: 'systems/svnsea2e/templates/items/background.html',
      tabs: [{
        navSelector: '.sheet-tabs',
        contentSelector: '.sheet-body',
        initial: 'description'
      }]
    })
  }
  
  _getAdditionalData (sheetData, baseData) {
    sheetData.nation = baseData.nation
    sheetData.quirk = baseData.quirk

    sheetData.selectedskills = {}
    for (let i = 0; i < baseData.skills.length; i++) {
      sheetData.selectedskills[baseData.skills[i]] = CONFIG.SVNSEA2E.skills[baseData.skills[i]]
    }

    sheetData.selectedadvantages = baseData.advantages
  }
}
