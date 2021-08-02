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
export class ItemSheetSS2eStory extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions () {
    return mergeObject(super.defaultOptions, {
      template: 'systems/svnsea2e/templates/items/story.html',
      tabs: [{
        navSelector: '.sheet-tabs',
        contentSelector: '.sheet-body',
        initial: 'description'
      }]
    })
  }

  _getAdditionalData (sheetData, baseData) {
    sheetData.status = baseData.status
    sheetData.reward = baseData.reward
    sheetData.endings = baseData.endings
    sheetData.steps = baseData.steps
  }
}
