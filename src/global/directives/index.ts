// import { UserModule } from '@/store/modules/user.store';
// import { DirectiveOptions } from 'vue';

// function checkArray(key) {
//   const userinfo = UserModule.userInfo;
//   let arr = userinfo.permissionCodes ? userinfo.permissionCodes : [];
//   let index = arr.indexOf(key);
//   if (index > -1) {
//     return true;
//   } else {
//     return false;
//   }
// }
// // 权限验证
// export const auth: DirectiveOptions = {
//   inserted(el, binding, vnode: any) {
//     let permission = binding.value;
//     if (permission) {
//       let hasPermission = checkArray(permission);
//       if (!hasPermission) {
//         el.parentNode && el.parentNode.removeChild(el);
//       }
//     }
//   }
//     // vnode.componentInstance.disabled = true
//     // let oTip = document.createElement('div')
//     // oTip.innerHTML = `<div>暂无权限，请联系管理员开通权限。</div>`;
//     // oTip.className = 'v-tooltip__content';
//     // el.style.position = 'relative';
//     // el.style.cursor = 'not-allowed';
//     // el.style.border = '1px solid #d9d9d9'
//     // el.style.background = '#F5F5F5'
//     // el.style.color = '#cccccc'
//     // el.style['text-shadow'] = 'none'
//     // el.style['box-shadow'] = 'none'
//     // // el.style['pointer-events'] = 'none'
//     // for (let attr in binding.modifiers) {
//     //   if (attr == 'top') {
//     //     oTip.style.cssText = 'left: 50%; top: -10px;  transform: translate(-50%,-100%);';
//     //   } else if (attr == 'right') {
//     //     oTip.style.cssText = 'right: -10px; top: 50%; transform: translate(100%,-50%)';
//     //   } else if (attr == 'left') {
//     //     oTip.style.cssText = 'left: -10px; top: 50%; transform: translate(-100%,-50%)';
//     //   } else {
//     //     oTip.style.cssText = 'left: 50%; bottom: -10px; transform: translate(-50%,100%)';
//     //   }
//     // }
//     // el.appendChild(oTip);
//     // el.onmousemove = function () {
//     //   oTip.style.opacity = '1';
//     // }
//     // el.onmouseout = function () {
//     //   oTip.style.opacity = '0';
//     // }
//     // const authCode = binding.value;
//     // 没有权限码或权限不足
//     // if (!authCode || !checkAuth(authCode)) {
//     //   el.parentNode && el.parentNode.removeChild(el);
//     // }
//   }

// // 加载
// export const loading: DirectiveOptions = {
//   inserted(el, binding) {
//     const authCode = binding.value;
//     // 没有权限码或权限不足
//     if (!authCode || !checkAuth(authCode)) {
//       el.parentNode && el.parentNode.removeChild(el);
//     }
//   }
// };
