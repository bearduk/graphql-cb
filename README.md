# graphql-cb

Served at [http://localhost:4000/graphql](http://localhost:4000/graphql)

Test query:

```js
{
  book (id: 2){
    name
    genre
    author{
      name
      books {
        name
      }
    }
  },
  author(id: 1){
    name
    age
    id
    books {
      name
    }
  }
}
```

Note that fields are wrapped in functions so that they can be rendered in the JS flow and then executed at a later time. ```fields: () => ({ //etc```.

The RootQuery is the only one that can have a simple ```fields: { //etc```.
