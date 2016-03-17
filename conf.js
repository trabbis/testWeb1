exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['WebContent/js/*-spec.js'],
  capabilities: {
	    browserName: 'chrome'
	    	}
};
