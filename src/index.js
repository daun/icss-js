/**
 * Parse a CSS module export object.
 *
 * @param {Object} exportObject
 * @param {Object} options
 * @returns {Object}
 */
export default function parseCssModuleExports(exportObject, options = {}) {
  return map(exportObject, (value) => parseCssExport(value, options))
}

/**
 * Parse a named CSS export value.
 *
 * @param {Object} exportValue
 * @param {Object} options
 * @returns {Number|String|Array|Object}
 */
export function parseCssExport(exportValue, { unitless = false } = {}) {
  let value = unquote(exportValue)
  if (isJson(value)) {
    value = JSON.parse(value)
  } else if (/^-{0,1}\d+$/.test(value)) {
    value = Number(value)
  }
  return unitless ? stripUnit(value) : value
}

/**
 * Strip the unit from a CSS value
 *
 * @param {String|Array|Object} val
 * @returns {Number}
 */
function stripUnit(val) {
  if (typeof val === 'string') {
    return parseFloat(val)
  }
  if (Array.isArray(val)) {
    return map(val, stripUnit)
  }
  if (typeof val === 'object') {
    return map(val, stripUnit)
  }
  return val
}

/**
 * Unquote quoted strings
 *
 * @param {String} str
 * @returns {String}
 */
function unquote(str) {
  const pair = str.charAt(0) + str.charAt(str.length - 1)
  return ['""', "''"].includes(pair) ? str.slice(1, str.length - 1) : str
}

/**
 * Simple check for JSON strings
 *
 * @param {String} str
 * @returns {Boolean}
 */
function isJson(str) {
  const pair = str.charAt(0) + str.charAt(str.length - 1)
  return ['{}', '[]', '""'].includes(pair)
}

/**
 * Map over array or object
 *
 * @param {Array|Object} val
 * @param {Function} callback
 * @returns {Array|Object}
 */
function map(val, callback) {
  if (Array.isArray(val)) {
    return val.map(callback)
  }
  if (typeof val === 'object') {
    return Object.keys(val).reduce((result, key) => {
      result[key] = callback(val[key])
      return result
    }, {})
  }
  return callback(val)
}
