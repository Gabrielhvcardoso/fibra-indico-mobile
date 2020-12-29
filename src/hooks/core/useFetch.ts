export const BASE_URL = 'http://dmihost.com.br:21002';

export const useFetch = {
  get: (url = '/', onEnd = (data: any) => {}) => {
    Promise.all([
      fetch(BASE_URL + url, {
        method: 'GET'
      })
    ]).then(([response]) => {
      response.json().then((data) => {
        onEnd(data);
      });
    });
  },

  post: async (url = '/', body: {} | FormData, onEnd = (data: any) => {}) => {
    fetch(BASE_URL + url + '/', body instanceof FormData
      ? {
          method: 'POST',
          body
        }
      : {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
    ).then((response) => {
      response.json()
        .then(data => {
          onEnd(data);
        })
        .catch(() => {
          onEnd({ code: 'error' });
        });
    });
  },

  put: async (url = '/', body: {} | FormData, onEnd = (data: any) => {}) => {
    fetch(BASE_URL + url + '/', body instanceof FormData
      ? {
          method: 'PUT',
          body
        }
      : {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }).then((response) => {
      response.json()
        .then(data => {
          onEnd(data);
        })
        .catch(() => {
          onEnd({ code: 'error' });
        });
    });
  },

  delete: async (url = '/', onEnd = (data: any) => {}) => {
    fetch(BASE_URL + url, {
      method: 'DELETE'
    }).then((response) => {
      response.json()
        .then(data => {
          onEnd(data);
        })
        .catch((e) => {
          onEnd({ code: 'error', ...e });
        });
    });
  }

};
