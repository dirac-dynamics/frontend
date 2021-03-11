# Frontend

To run the frontend (start after the backend):

```
$ docker build -t dirac-dynamics/frontend .
$ docker run --expose 8080 -p 8080:8080 dirac-dynamics/frontend
```