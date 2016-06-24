describe('NBSPS', function() {
//  var firstNumber = element(by.model('first'));
//  var secondNumber = element(by.model('second'));
//  var goButton = element(by.id('gobutton'));
//  var latestResult = element(by.binding('latest'));
  
  var username = element(by.id('username'));
  var password = element(by.id('password'));
  
//  beforeEach(function() {
//	  return browser.ignoreSynchronization=true; 
//  });

  beforeEach(function() {
	  browser.ignoreSynchronization = true;
    browser.get('https://localhost:7443/cas/login');
//    browser.get('https://angularjs.org');
//    browser.get('http://juliemr.github.io/protractor-demo/');
  });

  xit('should have a title', function() {
    expect(browser.getTitle()).toEqual('Super Calculator');
  });

  it('login test', function() {
	  username.sendKeys('admin');
	  password.sendKeys('welcome');
	  var submit = browser.findElement(by.name('_eventId_submit'));

	  submit.click();

//    expect(latestResult.getText()).toEqual('3');
	  
//	  var nbsHomeName = element(by.binding('nbsHomeName'));
	  var nbsHomeName = element(by.model('nbsHomeName'));
	  console.log('nbsHomeName...' + nbsHomeName.getText());
	  
	  //browser.pause();
	  //browser.debugger();
	  
	  
	  expect(nbsHomeName.getText()).toEqual('NBSPS');
	  browser.sleep(20000);
	  
	  
  });

  xit('should add four and six', function() {
	    firstNumber.sendKeys(4);
	    secondNumber.sendKeys(6);

	    goButton.click();
	    
	    expect(latestResult.getText()).toEqual('10');
  });
  
  
});

