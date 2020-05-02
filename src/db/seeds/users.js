exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users").del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          email: "schleem123@schleem.com",
          password: "asdkfj"
        },
        {
          email: "dude654@dude.com",
          password: "oibpkb"
        }
      ]);
    });
};
