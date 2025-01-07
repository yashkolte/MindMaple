import API from "./api"; // Import your centralized Axios instance

class TodoService {
  saveTodo(todo) {
    return API.post("/todo", todo);
  }

  getTodo(sub) {
    return API.get(`/todobysub/${sub}`);
  }

  deleteTodo(id) {
    return API.delete(`/todo/${id}`);
  }

  getTodoById(id) {
    return API.get(`/todo/${id}`);
  }

  updateTodo(todo, id) {
    return API.put(`/todo/${id}`, todo);
  }

  updateAIDescription(updatedData, id) {
    return API.put(`/todo/aidesc/${id}`, updatedData);
  }
}

export default new TodoService();
