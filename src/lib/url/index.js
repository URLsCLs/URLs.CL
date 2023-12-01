import { db } from '$lib/db';

let cachedTLDS = [];

/**
 * @returns array of valid TLDs
 * @example
 * getValidTLDS() // ["com", "net", "org", "edu", ...]
 */
export const getValidTLDS = async () => {
  // get https://data.iana.org/TLD/tlds-alpha-by-domain.txt
  // and parse it into an array of strings

  if (cachedTLDS.length > 0) {
    return cachedTLDS;
  }
  // this is the real deal
  let tlds = fetch('https://data.iana.org/TLD/tlds-alpha-by-domain.txt')
    .then(res => res.text())
    .then(text => text.split('\n'))
    .then(lines => lines.slice(1, -1))
    .then(lines => lines.map(line => line.toLowerCase()));

  cachedTLDS = tlds;

  return tlds;
}

/**
 *  
 * @param {string} urlString URL submitted by user to be shortened
 * @returns boolean indicating whether the URL is valid
 * @example 
 * isUrlValid("https://www.google.com") // true
 * isUrlValid("https://www.google") // false
 * 
 */
export const isUrlValid = async function (urlString) {

  if (!urlString || urlString.includes("urls.cl")) {
    return false;
  }

  const validTLDs = await getValidTLDS();

  const urlRegex = new RegExp(`^((http|https):\/\/)[a-zA-Z0-9.-]+(:[0-9]+)?\/?.*$`, "g");
  const validUrl = urlRegex.test(urlString);
  if (!validUrl) {
    return false;
  }

  const parsedUrl = new URL(urlString);
  const tld = parsedUrl.hostname.split(".").pop();
  return validTLDs.includes(tld);
};

/**
 * 
 * @param {string} url URL submitted by user to be shortened
 * @returns A randomly generated string known as a slug
 * @example
 * shorten("https://www.google.com") // "abc123"
 */
export const shorten = async (url) => {
  let randomString = Math.random().toString(36);
  let randomLength = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
  randomString = randomString.slice(2, randomLength + 2);
  return randomString;
}

/**
 * 
 * @param {string} slug Randomly generated string
 * @param {string} url URL submitted by user to be shortened
 * @returns result of the insert query
 * @example
 * addSlug("abc123", "https://www.google.com") // { affectedRows: 1, insertId: 1, warningStatus: 0 }
 */
export const addSlug = async (slug, url) => {
  const sql = `INSERT INTO slugs (slug, url) VALUES (?, ?);`;
  const params = [slug, url];
  const [result] = await db.execute(sql, params);
  return result;
}