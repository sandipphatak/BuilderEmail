
let config = {
    text:{
        mobile:{},
        desktop:{}
    },
    totalRow:0,
    // totalCta:0,  
    // titleRow:[]
}


function toggleView (id,txtInputVal,lastUsedTxt, getCssProp){

// let getAllEleMob = Object.keys(config.text.mobile)

    let contWrap = document.querySelectorAll(".mobWrp");
    let getActiveEleOnSwitch = document.getElementById(lastUsedTxt);

    if(id == 'mobView'){
        contWrap.forEach(cls => {
            cls.style.width = '320px';

            if(!txtInputVal.files) {
                txtInputVal.value = !config.text.mobile[lastUsedTxt] ? config.text.desktop[lastUsedTxt][getCssProp] : config.text.mobile[lastUsedTxt][getCssProp];
            }
            getActiveEleOnSwitch.style[getCssProp] = txtInputVal.value + "px" 

        });
    } else{
        contWrap.forEach(cls => {
            cls.style.width = '600px';

            if(!txtInputVal.files) {
                txtInputVal.value = config.text.desktop[lastUsedTxt][getCssProp];
            }

            let getAllEleDesk = config.text.desktop ;
            let getKey = Object.keys(getAllEleDesk)

            for (var i = 0; i < getKey.length; i++) {
                // let getActiveEleOnSwitch = document.querySelectorAll('head'[i]);
                console.log(getKey.length);
                getKey.forEach(arrayEle => {
                    arrayEle.style[getCssProp] = txtInputVal.value + "px"
                });
            }

                
        });

    }   
}



let tableConatiner = document.getElementById("tableBlock");

// active_edit
function ele_active (){    
    let activeEdit = document.querySelectorAll('.active_edit');
    activeEdit.forEach(active_edit => {
        active_edit.addEventListener('click', function () {
            activeEdit.forEach(btnClick => btnClick.classList.remove('active'));
            this.classList.add('active');
        });
    });  
}

//
let wrapBg_pos_x = document.getElementById("wrapBg_posx");
wrapBg_pos_x.addEventListener('input', () => {
    let wrapPos_x_unit = document.getElementById("wrapBgPos_x_drop").value;
    tableConatiner.style.backgroundPositionX = wrapBg_pos_x.value + wrapPos_x_unit;
});

//
let wrapBg_pos_y = document.getElementById("wrapBg_posy");
wrapBg_pos_y.addEventListener('input', () => {
    let wrapPos_y_unit = document.getElementById("wrapBgPos_y_drop").value;
    tableConatiner.style.backgroundPositionY = wrapBg_pos_y.value + wrapPos_y_unit;
});

// image upload wrapper
let wrapperBg = document.getElementById('wrapBg');
wrapperBg.addEventListener('change', () => {
    let [file] = wrapperBg.files
    if (file) {
        // let imgUrl = document.getElementById(lastUsed_img);
        tableConatiner.style.background  =  "url(" + URL.createObjectURL(file) + ") no-repeat" 
    }
});    

// Wrapper end

// Vertical Space
function vSpace() {
    //    
    let newHTMLTOappend = `<tr><td align="left" height="30" class="extSpace v_space active_edit" id="spacer" onClick="get_vSpace_id(this.id)" style="position:relative" data-toggle="collapse" data-target="#collapseTwo"></td></tr>`
    let currentHTML = tableConatiner.getInnerHTML();
    tableConatiner.innerHTML = currentHTML + newHTMLTOappend;

    //
    let trs = document.getElementsByClassName("v_space");
    for (let i = 0; i < trs.length; i++) {
        let tr = trs[i] ;
        tr.setAttribute("id", "spacer"+ ( i + 1 ));
    }     

}


let lastUsed = null;
function get_vSpace_id(clicked_id) {
    
    lastUsed = clicked_id;
    // alert(lastUsed);
    ele_active();

    // right panel show
    // let vSpaceShow = document.getElementById("collapseTwo");
    // vSpaceShow.classList.add("show") ;

    // Height Change
    let spaceInput = document.getElementById("spacerInput");
    spaceInput.addEventListener('input', () => {
        let v_spacer = document.getElementById(lastUsed);
        console.log(v_spacer);
        v_spacer.height = spaceInput.value;
    });

    let get_spaceInput = document.getElementById(lastUsed);
    let set_spaceInput = getComputedStyle(get_spaceInput);   
    spaceInput.value = parseInt(set_spaceInput.height); 
}

// Vertical Space end

// Txt Block
function txtBlock() {
    let newTextAppend = `<tr>
                <td align="center" class="active_edit">
                    <span class="topSize" id="head1" style="font-size:36px;color:#000000;font-weight:700;letter-spacing:normal;font-family:Poppins,Arial,sans-serif;line-height:54px;text-decoration: none;display: block;padding:0 10px;position: relative;text-transform: none;" onClick="get_mHead_id(this.id)" data-toggle="collapse" data-target="#collapseThree">Job Opportunity at Hilton</span>
                </td>
            </tr>`
    let currentTextHTML = tableConatiner.getInnerHTML();
    tableConatiner.innerHTML = currentTextHTML + newTextAppend;

    let head_txt = document.getElementsByClassName("topSize");
    console.log(head_txt.length)
    for (let i = 0; i < head_txt.length; i++) {
        let tr = head_txt[i] ;
        tr.setAttribute("id", "head"+ ( i + 1 ));
        config.totalRow = ( i + 1 );
        console.log(config)
    }     
}


let lastUsedTxt = null;
function get_mHead_id(clicked_id_txt){
    // prevClickedHead = lastUsedTxt;
    lastUsedTxt = clicked_id_txt;

    // console.log(lastUsedTxt, "gg");
    // alert(lastUsedTxt);

    fontPreview = document.getElementById(lastUsedTxt);
    
    ele_active();
    let txt_id = document.getElementById(lastUsedTxt);
    let getStyle_txt = getComputedStyle(txt_id); 

    //
    let txtInput = document.getElementById("txtInput");
    txtInput.addEventListener('input', () => {
        let txt = document.getElementById(lastUsedTxt);
        txt.innerHTML = txtInput.value ;
    });
    txtInput.value = txt_id.innerHTML; 

    function updatecssValue (id, getCssProp){

        let txtInput = document.getElementById(id);
        let hexInput = document.getElementById("hex");

        let mob_View = document.getElementById("mobView")
        mob_View.addEventListener("click", function() {toggleView('mobView', txtInput, lastUsedTxt, getCssProp)});
        let desk_view = document.getElementById("deskView")
        desk_view.addEventListener("click", function() {toggleView('deskView', txtInput, lastUsedTxt, getCssProp)});

        function updateObj() {
            
            let mobWidth;
            let mobView = document.querySelectorAll(".mobWrp");
            mobView.forEach(e => {
               mobWidth = e.style.width;
            });

            for(i = 1; i <= config.totalRow; i++){
                // console.log(lastUsedTxt, "head" + i) 

                // if (window.matchMedia('(max-width: 768px)').matches){
                if (mobWidth == '320px'){
                    if (lastUsedTxt == "head" + i){ 
                        if(!config.text.mobile[lastUsedTxt]) config.text.mobile[lastUsedTxt] = {}
                        config.text.mobile[lastUsedTxt][getCssProp] = txtInput.value 

                    }
                } else{
                    if (lastUsedTxt == "head" + i){ 
                        if(!config.text.desktop[lastUsedTxt]) config.text.desktop[lastUsedTxt] = {}
                        config.text.desktop[lastUsedTxt][getCssProp] = txtInput.value ;
                    }

                }    
            }

        }        

        function cssChange (){
            let currentEle = document.getElementById(lastUsedTxt);
            currentEle.style[getCssProp] = txtInput.value + "px"
            updateObj();
        }

        function textTransform(){
            let currentEle = document.getElementById(lastUsedTxt);
            currentEle.innerHTML = txtInput.value === "Yes" ? currentEle.innerHTML.toUpperCase() : currentEle.innerHTML.toLowerCase();
            updateObj();
        }

        function textItalic(){
            let currentEle = document.getElementById(lastUsedTxt);
            currentEle.style[getCssProp] = txtInput.value == "Yes" ? "Italic" : "inherit";
            updateObj();
        }

        function txtColor(){
            let color = txtInput.value;
            hexInput.value = color;

            let currentEle = document.getElementById(lastUsedTxt);
            currentEle.style[getCssProp] = color;
            updateObj();
        }

        // background image 
        function bgImage(){
            let [file] = txtInput.files
            if (file) {
                let currentEle = document.getElementById(lastUsedTxt);
                currentEle.style[getCssProp]  =  "url(" + URL.createObjectURL(file) + ") no-repeat" 
            };
            updateObj();
        }
        
        function bgPos (id){
            let currentEle = document.getElementById(lastUsedTxt);
            let pos_unit = document.getElementById(id);
            let pos = pos_unit.value;
            currentEle.style[getCssProp] = txtInput.value + pos

            updateObj();
        }
        function bgPosUnit (id){
            let pos_unit = document.getElementById(id);
            let get_unit_Val = getStyle_txt[getCssProp];
            let get_unit = get_unit_Val.replace(/\d/g, "");
            pos_unit.value = get_unit;
        }
        // background image  end

        txtInput.addEventListener('input', (e) => {
            if(e.currentTarget.id == "fSize1") cssChange();
            if(e.currentTarget.id == "lHeight") cssChange();
            if(e.currentTarget.id == "lSpacing") cssChange();
            if(e.currentTarget.id == "paddTop") cssChange();
            if(e.currentTarget.id == "paddBtm") cssChange();
            if(e.currentTarget.id == "paddLeft") cssChange();
            if(e.currentTarget.id == "paddRight") cssChange();
            if(e.currentTarget.id == "uCase") textTransform();
            if(e.currentTarget.id == "txtBg") bgImage();
            if(e.currentTarget.id == "bg_pos_x")bgPos ('pos_x_drop');
            if(e.currentTarget.id == "bg_pos_y")bgPos ('pos_y_drop');
            if(e.currentTarget.id == "tItalic") textItalic();
            if(e.currentTarget.id == "color") txtColor();
        });


        if(id == "fSize1") { txtInput.value = parseInt(getStyle_txt.fontSize);}
        if(id == "lHeight") txtInput.value = parseInt(getStyle_txt.lineHeight);
        if(id == "lSpacing") txtInput.value = parseInt(getStyle_txt.letterSpacing);
        if(id == "paddTop") txtInput.value = parseInt(getStyle_txt.paddingTop);
        if(id == "paddBtm") txtInput.value = parseInt(getStyle_txt.paddingBottom);
        if(id == "paddLeft") txtInput.value = parseInt(getStyle_txt.paddingLeft);
        if(id == "paddRight") txtInput.value = parseInt(getStyle_txt.paddingRight);
        if(id == "uCase") txtInput.value = getStyle_txt.textTransform === "none" ? "select" : "yes";
        if(id == "txtBg") txtInput.file = getStyle_txt.background;
        if(id == "bg_pos_x") {txtInput.value = parseInt(getStyle_txt.backgroundPositionX);
            bgPosUnit ('pos_x_drop');
        };
        if(id == "bg_pos_y") {txtInput.value = parseInt(getStyle_txt.backgroundPositionY);
            bgPosUnit ('pos_y_drop');
        }
        if(id == "tItalic") txtInput.value = getStyle_txt.fontStyle == "italic" ? "Yes" : "No";;
        if(id == "color") txtInput.value = getStyle_txt.color;
        // console.log(txtInput.value)

    }
    updatecssValue("fSize1", 'fontSize');
    updatecssValue("lHeight", 'lineHeight');
    updatecssValue("lSpacing", 'letterSpacing');
    updatecssValue("paddTop", 'paddingTop');
    updatecssValue("paddBtm", 'paddingBottom');
    updatecssValue("paddLeft", 'paddingLeft');
    updatecssValue("paddRight", 'paddingRight');  
    updatecssValue("uCase", "textTransform");
    updatecssValue("txtBg", "background");
    updatecssValue("bg_pos_x", "backgroundPositionX");
    updatecssValue("bg_pos_y", "backgroundPositionY");
    updatecssValue("tItalic", "fontStyle");
    updatecssValue("color", "color");
 
}

// Txt Block end
 

// CTA  
 
function ctaBlock() {
    let newCtaAppend = `<tr data-toggle="collapse" data-target="#collapseFour" onClick="get_cta_id(this.id)" class="ctaBlock active_edit">
                            <td align="center">
                                <!--[if mso]>
                                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{campaign_publisher_url}}" style="height:90px; width:410px;v-text-anchor:middle;font-family:Arial,sans-serif" stroke="f" fillcolor="#ffc400">
                                <center>
                                    <![endif]-->
                                    <a href="{{campaign_publisher_url}}" class="ctaWrap" title="UPS JOB LISTINGS" style="background:#ffc400;border-radius:5px;display: inline-block; font-family:sans-serif;font-weight:400; text-decoration:none;  -webkit-text-size-adjust:none; vertical-align: middle;width: 400px;"  >
                                        <span style="height:22px;width: 100%;display:block" class="reduceHeight"></span>
                                        <span class="cta" style="font-size:25px; line-height:32px;color:#000000; font-family:Poppins, sans-serif;width:345px;text-align: left;display: inline-block;font-weight:800" align="left">UPS JOB LISTINGS </span>
                                        <span align="right" style="text-align: right;display: inline-block;vertical-align: middle;" >
                                            <img class="arrowImage" src="https://eoa-editor.s3.amazonaws.com/081ef8fc986d5577a27b8cf21eb5d0e656203a97%2FEmail-UPS+Jobs-v1-Jun22%2Farrow.png" align="center" style="border:none; vertical-align:super; outline:none;text-align:right;" >
                                        </span>
                                        <span style="height:22px;width: 100%;display:block" class="reduceHeight"></span></a>
                                    <!--[if mso]>
                                </center>
                                </v:rect>
                                <![endif]-->
                            </td>
                        </tr>`
    
    let currentCtaHTML = tableConatiner.getInnerHTML();
    tableConatiner.innerHTML = currentCtaHTML + newCtaAppend;

    let cta_block = document.getElementsByClassName("ctaBlock");
    for (let i = 0; i < cta_block.length; i++) {
        let cta = cta_block[i] ;
        cta.setAttribute("id", "cta"+ ( i + 1 ));
    }   
}

let lastUsed_cta = null;
function get_cta_id(clicked_id_cta) {
    
    lastUsed_cta = clicked_id_cta;
    // alert(lastUsed_cta);
    ele_active();

    fontPreview = document.getElementById(lastUsed_cta).querySelector('.cta');

    // let get_cta = document.getElementById(lastUsed_cta).getElementsByClassName("botCTA");
    // let imgStyle = getComputedStyle(get_img);

    let ctaWidth = document.getElementById("cta_width");
    ctaWidth.addEventListener('input', () => {
        let cta_width = document.getElementById(lastUsed_cta).querySelector('.ctaWrap');
        cta_width.style.width = ctaWidth.value + "px";
        console.log(cta_width);
      
    });
    // ctaWidth.value = parseInt(getStyle_txt.fontSize); 

    let ctaVspace = document.getElementById("cta_vspace");
    ctaVspace.addEventListener('input', () => {
        let cta_vSpace = document.getElementById(lastUsed_cta).querySelectorAll('.reduceHeight');
        cta_vSpace.forEach(el => {
            el.style.height = ctaVspace.value + "px";
          });
    });

    // cta clone
    let cloneEle = document.getElementById("clone_cta");
    cloneEle.addEventListener('click', () => {
        let clonecta_id = document.getElementById(lastUsed_cta);
        let clone_ele = clonecta_id.cloneNode(true);
        clone_ele.classList.add('cloneCta');
        tableConatiner.appendChild(clone_ele);

        let cta_blockID = document.getElementsByClassName("cloneCta");
        for (let i = 0; i < cta_blockID.length; i++) {
            let clone_ele1 = cta_blockID[i] ;
            clone_ele1.setAttribute("id", "cloned_cta"+ ( i + 1 ));            
        }   

    });

    let ctaBgInput = document.getElementById("ctabg");
    let ctaBgHexInput = document.getElementById("ctabghex");
    ctaBgInput.addEventListener('input', () => {
        let ctaBgColor = ctaBgInput.value;
        ctaBgHexInput.value = ctaBgColor;
        document.getElementById(lastUsed_cta).querySelector('.ctaWrap ').style.background = ctaBgColor;
    });

    // cta gradient bg
    let ctabgGred = document.getElementById("cta_grad");
    ctabgGred.addEventListener('input', () => {
        let ctabg_Gred = document.getElementById(lastUsed_cta).querySelector('.ctaWrap');
        ctabg_Gred.style.cssText += ctabgGred.value ;
    });


    let ctaTxt = document.getElementById("cta_txt");
    ctaTxt.addEventListener('input', () => {
        let cta_txt = document.getElementById(lastUsed_cta).querySelector('.cta');
        cta_txt.innerHTML = ctaTxt.value;
    });
    cta_txtVal = document.getElementById(lastUsed_cta).querySelector('.cta').innerHTML;
    ctaTxt.value = cta_txtVal; 


    let ctaSize = document.getElementById("cta_Size");
    ctaSize.addEventListener('input', () => {
        let cta_size = document.getElementById(lastUsed_cta).querySelector('.cta');
        cta_size.style.fontSize = ctaSize.value + "px"; 
    });
    cta_sizeVal = getComputedStyle(document.getElementById(lastUsed_cta).querySelector('.cta'));
    ctaSize.value = parseInt(cta_sizeVal.fontSize);


    let ctaColorInput = document.getElementById("ctacolor");
    let ctaHexInput = document.getElementById("ctahex");
    ctaColorInput.addEventListener('input', () => {
        let ctaColor = ctaColorInput.value;
        ctaHexInput.value = ctaColor;
        document.getElementById(lastUsed_cta).querySelector('.cta').style.color = ctaColor;
    });


    let ctalHeight = document.getElementById("cta_lHeight");
    ctalHeight.addEventListener('input', () => {
        let cta_lHeight = document.getElementById(lastUsed_cta).querySelector('.cta');
        cta_lHeight.style.lineHeight = ctalHeight.value + "px"; 
    });
    cta_lHeightVal = getComputedStyle(document.getElementById(lastUsed_cta).querySelector('.cta'));
    ctalHeight.value = parseInt(cta_lHeightVal.lineHeight);


    let ctatxtWidth = document.getElementById("cta_tWidth");
    ctatxtWidth.addEventListener('input', () => {
        let cta_txtWidth = document.getElementById(lastUsed_cta).querySelector('.cta');
        cta_txtWidth.style.width = ctatxtWidth.value + "px"; 
    });
    cta_txtWidthVal = getComputedStyle(document.getElementById(lastUsed_cta).querySelector('.cta'));
    ctatxtWidth.value = parseInt(cta_txtWidthVal.width);

    // arrow image upload
    let arrImg = document.getElementById('arrImg');
    arrImg.addEventListener('change', () => {
       let [file] = arrImg.files
        if (file) {
            let arrowImage = document.getElementById(lastUsed_cta).querySelector('.arrowImage')
            arrowImage.src = URL.createObjectURL(file)
        }
    });        

}

// CTA  end

// imgBlock

function imgBlock() {
    let newImgAppend = `<tr data-toggle="collapse" data-target="#collapseFive">
                            <td align="center" class="active_edit">
                            <img src="https://eoa-editor.s3.amazonaws.com/081ef8fc986d5577a27b8cf21eb5d0e656203a97%2FEmail-Chevrolet+Blazer-DF-v1-March21%2Fmain.jpg"  style="border:none;outline:none;height: auto;font-size: 25px; color: #000000;font-weight: bold;" border="0" align="center" class="bgPic" alt="Hilton Jobs" vspace="0" hspace="0" id="imgCont"  onclick="get_img_id(this.id)">
                            </td>
                        </tr>`
    let currentImgHTML = tableConatiner.getInnerHTML();
    tableConatiner.innerHTML = currentImgHTML + newImgAppend;


    let img_block = document.getElementsByClassName("bgPic");
    for (let i = 0; i < img_block.length; i++) {
        let tr = img_block[i] ;
        tr.setAttribute("id", "imgCont"+ ( i + 1 ));
    }   
}

let lastUsed_img = null;
function get_img_id(clicked_id_img) {
    
    lastUsed_img = clicked_id_img;
    // alert(lastUsed_img);
    ele_active();

    let get_img = document.getElementById(lastUsed_img);
    // let imgStyle = getComputedStyle(get_img);   

    // right panel show
    // let imgShow = document.getElementById("collapseFive");
    // imgShow.classList.add("show") ;

    // Img Url
    // let img_url = document.getElementById("img_url");
    // img_url.addEventListener('input', () => {
    //     let imgUrl = document.getElementById(lastUsed_img);
    //     imgUrl.src = img_url.value;
    // });
    // img_url.value = get_img.src; 
 
    // image upload
    let img_url = document.getElementById('img_url');
    img_url.addEventListener('change', () => {
       let [file] = img_url.files
        if (file) {
            let imgUrl = document.getElementById(lastUsed_img);
            imgUrl.src = URL.createObjectURL(file)
        }
    });    

    // Img Width 
    let img_width = document.getElementById("img_width");
    img_width.addEventListener('input', () => {
        let imgW = document.getElementById(lastUsed_img);
        imgW.width = img_width.value;
    });
    img_width.value = get_img.width; 

    // Img Attribute
    let img_alt = document.getElementById("img_alt");
    img_alt.addEventListener('input', () => {
        let imgAlt = document.getElementById(lastUsed_img);
        imgAlt.alt = img_alt.value;
        // console.log(imgAlt.alt);
    });
    img_alt.value = get_img.alt;
}
// imgBlock end


// Google Font api 

let selectFont = document.querySelectorAll(".fontFamily");
let selectVariant = document.querySelectorAll(".fontVariants");

function getData(){
   let url = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCcyENRATfAMaX75oUYf12Ll2WVJxqtyRw&sort=popularity";
   fetch(url).then((response) => {
       return response.json();
   }).then((data)=>{
       for (let i = 0; i < data.items.length; i++) {  
            selectFont.forEach(function(font) {
                let option = document.createElement('option');
                option.textContent = data.items[i].family;
                option.value = data.items[i].family;
                font.add(option);
            });

       }
   });
}
getData();

selectFont.forEach(fontChange => {
fontChange.addEventListener('change', (e) => {

   let FValue = e.target.value;
   console.log(FValue);

   let apiUrl = [];
   apiUrl.push('https://fonts.googleapis.com/css2?family=' + FValue.replace(/ /g, '+') );
  
   let urls = apiUrl.join('');
   let links = urls;
   let fontLink = document.createElement("link");
   fontLink.setAttribute("href", links);
   fontLink.setAttribute("rel", 'stylesheet');
   fontLink.setAttribute("class", 'font_link');
   document.body.appendChild(fontLink);    

   function getVariants(){
       let urlvariant = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCcyENRATfAMaX75oUYf12Ll2WVJxqtyRw&sort=popularity";
       fetch(urlvariant).then((res) => {
           return res.json();
       }).then((variant)=>{

           for (let i = 0; i < variant.items.length; i++) {  
               // console.log(variant.items[i].family);
               if (FValue === variant.items[i].family) {
               
                    let fv = variant.items[i].variants;
                    fv.splice(fv.indexOf('regular'), 1, '400');
                    selectVariant.forEach(function(val) {
                        val.innerHTML = "";
                        fv.forEach(function(variants) {
                            let option = document.createElement('option');
                            option.textContent = variants;
                            option.value = variants;
                            val.appendChild(option);
                        });
                    }); 

                   let variantArray = [];
                   selectVariant.forEach(fontVariant => {
                    fontVariant.addEventListener('change', (e) => {                   
                        let variantVal = e.target.value;;
                        fontPreview.style.fontWeight = variantVal;
                    
                        variantArray.push(variantVal);

                        let uniqueVariants = [...new Set(variantArray)];
                        uniqueVariants.sort()
                        let u_vari = uniqueVariants.join(";");
                        
                        let lastLink = document.getElementsByClassName("font_link");
                        let last_fontLink = lastLink[lastLink.length - 1];
                        last_fontLink.setAttribute("href", apiUrl + ':wght@'  + u_vari);
                      
                        });
                    });
                   
               }

           }
       });
   }
   getVariants();

   fontPreview.style.fontFamily = fontChange.value;

}); 
});



// Copy code
let copyCode = document.getElementById('copy');
copyCode.addEventListener('click', () => {

    // let fincalcss = genrateFinalcss();
    // document.getElementById('mobStyle').innerHTML = fincalcss;

    let emailPanel = document.getElementById('copy_code').innerHTML;
    let txtArea = document.getElementById('codeAppend');
    txtArea.value =  emailPanel;
    txtArea.select();

    let copied;
    try {copied = document.execCommand('copy');} 
    catch (ex){
      copied = false;  
    }

    if(copied){
        let copyAlert =  document.getElementById('copyStatus'); 
        copyAlert.style.display = 'block'
        setTimeout(() => {
            copyAlert.style.display = 'none';
          }, 3000);     
    }
});





