'use babel';

const fs = require('fs');

let cachedPackageName = undefined;

export function packageName() {
	return cachedPackageName = cachedPackageName || fetchPackageName('../../package.json', 'particle-dev-libraries');
}

export function fetchPackageName(module, defaultName) {
	try {
		const pjson = require(module);
		return pjson.name;
	} catch (error) {
		return defaultName;
	}
}
