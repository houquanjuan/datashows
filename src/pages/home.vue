<template>
    <div class="table-box">
        <table class="table table-bordered table-hover">
        <caption>人员列表</caption>
        <thead>
            <tr class="">
                <th>id</th>
                <th>姓名</th>
                <th>年龄</th>
                <th>操作<i class="glyphicon glyphicon-plus-sign" data-toggle="modal" data-target="#popModal" @click="addData()"></i></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(tableData,index) in tableDatas">
                <td>{{tableData.user_id}}</td>
                <td>{{tableData.name}}</td>
                <td>{{tableData.age}}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-info btn-mini" data-toggle="modal" data-target="#popModal" @click="toEditData(index,tableData.user_id,tableData.name,tableData.age)">编辑</button>
                        <button class="btn btn-danger btn-mini" data-toggle="modal" data-target="#popModal" @click="deleteData(index,tableData.user_id,tableData.name,tableData.age)">删除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
// import Urls from '../publicService/urls.js';
// import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
        // tableDatas: [],
    }
  },
  computed: {
    tableDatas(){
        return this.$store.state.personData
    }
  },
  mounted() {
      this.$store.dispatch('getPersonData');
  },
  methods: {
      toEditData(editIndex,editId,editName,editAge){
          this.$store.dispatch('changePopName','编辑');
          //改变全局的editData
          this.$store.dispatch('changeEditData',{index:editIndex,id:editId,name:editName,age:editAge});
      },
      addData(){
          this.$store.dispatch('changePopName','添加');
          this.$store.dispatch('changeEditData',{});
      },
      deleteData(index,editId,editName,editAge){
          this.$store.dispatch('changePopName','删除');
          this.$store.dispatch('changeEditData',{index:index,id:editId,name:editName,age:editAge});
          this.$store.dispatch('delDataIndex',index);
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-box{
    padding-top: 20px;
}
</style>
