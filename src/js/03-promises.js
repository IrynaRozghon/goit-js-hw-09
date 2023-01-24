
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const formEl = document.querySelector('.form');
formEl.addEventListener('input', selectData);
formEl.addEventListener('submit', onFormSubmit);

const data = {};
function selectData(el){
data[el.target.name] = +el.target.value
};

function onFormSubmit(el){
  el.preventDefault();
  const {delay, step, amount} = data
  
    for (let i = 1; i <= amount; i += 1){
      
    let newDelay = delay + (i - 1) * step
        
        createPromise(i, newDelay).then(({ position, delay }) => {
        
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
        })
            .catch(({ position, delay }) => {
                Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
            });
    };
  el.target.reset()
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay })
            }
            reject({ position, delay })
        }, delay)
    });
};


//  -------  проміси 
// const promise = new Promise((resolve, reject) => {
//   const canFulfill = Math.random() > 0.5;
//   if (canFulfill) {
//     resolve('виповнено fulfilled');
//   }
//   reject('помилка rejected');
// });
//     метод then є у проміса на прототипі і так можна у зовнішньому коді отримтаи результат промісу
// const promise = new Promise((resolve, reject) => {
//   const canFulfill = Math.random() > 0.5;
//   setTimeout(() => {
//     if (canFulfill) {
//       resolve('виповнено fulfilled');
//     }
//     reject('помилка rejected');
//   }, 2000);
// });

// console.log(promise);


// // планування якщо проміс успішний -  із resolve запишеться у параметр result  виконується ця функція, неуспішний - reject запишеться у параметр error
// promise.then(result => {
//   console.log(result)
// }, error => {
//   console.log(error);
// },
// );
// // або зовнішніми функціями 
// promise.then(onFulfilled, onRejected);

// function onFulfilled(result) {
//   console.log('onFulfilled -> onFulfilled');

// };
// function onRejected(error) {
//   console.log('onRejected -> onRejected');
// };