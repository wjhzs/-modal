<template>
    <div class="messageBox">
        <h2>{{ title }}</h2>
        <div class="content">
            <p>{{ content }}</p>
        </div>
        <div class="btn">
            <div class="cancel" v-if="cancel" @click="handleCancel">{{ cancel }}</div>
            <div class="confirm" v-if="ok" @click="handleOk">{{ ok }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'MessageBox'
}
</script>

<style lang="less" scoped>
    .messageBox{ 
        width: 520px;
        border:1px #ccc solid; 
        border-radius: 4px; 
        background:white; 
        box-shadow: 3px 3px 3px 3px #ccc;
         position: absolute; 
         left: 50%; 
         top: 50%; 
         transform: translate(-50%,-50%);
         h2{
             height: 130px;
             height: 54px;
             line-height: 54px;
             font-size: 18px;
             padding-left: 24px;
         }
         .content{
             height: 50px;
             border-top: 1px solid #f0f0f0;
             border-bottom: 1px solid #f0f0f0;
             padding: 24px;
             font-size: 14px;
         }
         .btn{
             display: flex;
             align-items: center;
             justify-content: flex-end;
             padding: 11px;
             div{
                 width: 62px;
                 height: 30px;
                 text-align: center;
                 line-height: 30px;
                 border: 1px solid #d9d9d9;
                 font-size: 12px;
             }
             .cancel{
                 background: white;
                 color: #000;
                 margin-right:6px;
             }
             .confirm{
                 background: #1890ff;
                 color: #fff;
             }
         }

    }

    
</style>
