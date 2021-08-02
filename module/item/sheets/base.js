import {
  SVNSEA2E
} from '../../config.js'
import SkillSelector from '../../apps/skill-selector.js'
import AdvantageSelector from '../../apps/advantage-selector.js'

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class ItemSheetSS2e extends ItemSheet {
  /** @override */
  static get defaultOptions () {
    return mergeObject(super.defaultOptions, {
      classes: ['svnsea2e', 'sheet', 'item'],
      width: 600,
      height: 700
    })
  }

  /* -------------------------------------------- */

  /** @override */
  getData () {
    const baseData = super.getData()
    const isOwner = this.document.isOwner
    let sheetData = {
      owner: isOwner,
      item: baseData.item,
      itemType: SVNSEA2E.itemTypes[baseData.item.type],
      img: baseData.data.img,
      description: baseData.data.data.description,
      infosource: baseData.data.data.infosource,
      name: baseData.data.name,
      options: this.options,
      editable: this.isEditable,
      cssClass: isOwner ? 'editable' : 'locked',
      config: CONFIG.SVNSEA2E,
      dtypes: ['String', 'Number', 'Boolean']
    }

    this._getAdditionalData(sheetData, baseData.item.data.data)

    return sheetData
  }

  /** to be overridden by subclasses */
  _getAdditionalData (sheetData, baseData) {}

  /* -------------------------------------------- */

  /** @override */
  setPosition (options = {}) {
    const position = super.setPosition(options)
    const sheetBody = this.element.find('.sheet-body')
    const bodyHeight = position.height - 192
    sheetBody.css('height', bodyHeight)
    return position
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners (html) {
    super.activateListeners(html)

    html.find('.skill-selector').click(this._onSkillSelector.bind(this))
    html.find('.advantage-selector').click(this._onAdvantageSelector.bind(this))
  }

  /* -------------------------------------------- */

  _advCompare (object, value) {
    for (const property in object) {
      if (object[property] === value) {
        return true
      }
    }
    return false
  }

  async _getAllAdvantages () {
    const advantages = []
    const items = game.items.directory.entities
    for (let i = 0; i < items.length; i++) {
      if (items[i].type === 'advantage') {
        advantages.push(items[i].name)
      }
    }

    const packs = game.packs.entries
    const worldAdv = duplicate(advantages)
    for (var i = 0; i < packs.length; i++) {
      const pack = packs[i]
      if (pack.metadata.entity === 'Item') {
        const pitems = await pack.getIndex()
        for (let j = 0; j < pitems.length; j++) {
          const entry = await pack.getEntry(pitems[j]._id)
          if (entry.type === 'advantage' && !worldAdv.includes(entry.name)) {
            advantages.push(entry.name)
          }
        }
      }
    }
    return advantages
  }

  /* -------------------------------------------- */

  /**
   * Handle spawning the skillSelector application which allows a checkbox of multiple skill options
   * @param {Event} event   The click event which originated the selection
   * @private
   */
  _onSkillSelector (event) {
    event.preventDefault()
    const a = event.currentTarget
    const options = {
      title: game.i18n.localize('SVNSEA2E.Skills'),
      choices: CONFIG.SVNSEA2E[a.dataset.options]
    }
    new SkillSelector(this.item, options).render(true)
  }

  /* -------------------------------------------- */

  /**
   * Handle spawning the advantageSelector application which allows a checkbox of multiple advantage options
   * @param {Event} event   The click event which originated the selection
   * @private
   */
  async _onAdvantageSelector (event) {
    event.preventDefault()
    const options = {
      title: game.i18n.localize('SVNSEA2E.Advantages'),
      choices: await this._getAllAdvantages()
    }
    new AdvantageSelector(this.item, options).render(true)
  }
}
