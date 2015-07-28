# Spot Captcha
**Spot Captcha** is a simple jQuery plugin tha you can use instead of the everywhere seen captchas. 

How to use:

- Include jQuery plugin in your page *(Supported versions 1.6+)*

- Include the plugin file 

- Create a DIV element and give it an ID *(example: captcha-container)*

- Use the plugin on the DIV element as shown below
```
var check = $("#captcha-container").spotsCaptcha();
```
- Check the result
```
if(check.getCaptchaResult()){
    //proceed
}
```

