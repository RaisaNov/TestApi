import { expect } from "chai";
import sinon from "sinon";
import { fetchUsers } from "../fetchUsers.js";
import { add } from "../fetchUsers.js";


describe('fetchUsers', () => {
  let consoleLogSpy;

  beforeEach(() => {
    // Создаем spy для console.log
    consoleLogSpy = sinon.spy(console, 'log');
  });


  afterEach(() => {
    // Восстанавливаем console.log
    consoleLogSpy.restore();
  });

  it('должна выводить имена пользователей в консоль', async () => {
    // Создаем заглушку для fetch
    const fetchStub = sinon.stub(global, 'fetch');

    // Настраиваем заглушку, чтобы возвращать данные
    fetchStub.resolves({
      ok: true,
      json: async () => [
        { name: 'User 1' },
        { name: 'User 2' },
        { name: 'User 3' }
      ]
    });

    await fetchUsers();

    // Проверяем, что console.log был вызван с ожидаемыми именами
    expect(consoleLogSpy.callCount).to.equal(3);
    expect(consoleLogSpy.getCall(0).args[0]).to.equal('User 1');
    expect(consoleLogSpy.getCall(1).args[0]).to.equal('User 2');
    expect(consoleLogSpy.getCall(2).args[0]).to.equal('User 3');

    // Восстанавливаем fetch
    fetchStub.restore();
  });


  it('должна выводить сообщение об ошибке, если запрос не успешен', async () => {
    // Создаем заглушку для fetch
    const fetchStub = sinon.stub(global, 'fetch');
    fetchStub.resolves({ ok: false, status: 404, statusText: 'Not Found' });


    // Создаем spy для console.error
    const consoleErrorSpy = sinon.spy(console, 'error');

    await fetchUsers();

    // Проверяем, что console.error был вызван с сообщением об ошибке
     expect(consoleErrorSpy.callCount).to.equal(1);
    expect(consoleErrorSpy.getCall(0).args[0]).to.include('Ошибка при получении пользователей');
   
    fetchStub.restore();
      consoleErrorSpy.restore()

  });

   it('должна выводить сообщение об ошибке если произошла другая ошибка', async () => {
    // Создаем заглушку для fetch
    const fetchStub = sinon.stub(global, 'fetch');
    fetchStub.rejects(new Error("Some error happened"));


    // Создаем spy для console.error
    const consoleErrorSpy = sinon.spy(console, 'error');

    await fetchUsers();

    // Проверяем, что console.error был вызван с сообщением об ошибке
     expect(consoleErrorSpy.callCount).to.equal(1);
    expect(consoleErrorSpy.getCall(0).args[0]).to.include('Ошибка при получении пользователей');
   
    fetchStub.restore();
      consoleErrorSpy.restore()

  });

  it ('Функция должна вернуть сумму чисел', ()=> {
    const result = add(2, 3);
    expect(result).to.equal(5);
});

  it ('Функция должна вернуть отрицательное значение', ()=> {
    const result = add(-2, -3);
    expect(result).to.equal(-5);

})
});