import {
  totast,
  BASE_URL,
  API_URL_updatePhoto
}from '../../service/config'
import {
  submitProve
}from '../../service/infoSum'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: {
      idCardR:{
        name:'身份证正面',
        label:'idCardR',
        url:''
      },
      idCardeB:{
        name:'身份证反面',
        label:'idCardeB',
        url:''
      },
      campusCard:{
        name:'校园卡',
        label:'campusCard',
        url:''
      },
      stuIdCard:{
        name:'学生卡',
        label:'stuIdCard',
        url:''
      }
    }, 
    returnUrlList:[],
    index: null,
    picker: ['是', '否'],
  },
  ChooseImage(e) {
    const {type}=e.currentTarget.dataset 
    const imgUrl=`imgList.${type}.url`    
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        const localUrl= res.tempFilePaths[0]             
          this.setData({
            [imgUrl]: localUrl
          })
          wx.uploadFile({
            url:  BASE_URL+API_URL_updatePhoto, 
            filePath: localUrl,
            name: type,
            header:'multipart/form-data',
            formData: {
              file: localUrl,
            },      
            success (res){
              console.log('成功');             
            },
            fail (reject){
              console.log(localUrl);             
            },
            complete (){
              console.log(type);             
            }
          })
      }
    });
  },
  _submitProve(returnUrlList){
    submitProve().then(res=>{

    })
  }
})