const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

const app = express();

mongoose.connect('mongodb+srv://tunde1:passwd123@cluster0-wwj2v.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// app.post('/api/recipes', (req, res, next) => {
//     console.log(req.body);
//     res.status(201).json({
//         message: 'Thing created successfully!'
//     });
// });

// app.post('/api/recipes', (req, res, next) => {
//     console.log(req.body);
//     const recipe = new Recipe({
//         title: req.body.title,
//         ingredients: req.body.ingredients,
//         difficulty: req.body.difficulty,
//         time: req.body.time,
//         _id: req.body._id
//     });
//     recipe.save().then(
//         () => {
//             res.status(201).json({
//                 message: 'Post saved successfully!'
//             });
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     )
// });

app.post('/api/recipes', (req, res, next) => {
    console.log(req.body);
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        difficulty: req.body.difficulty,
        time: req.body.time,
        userId: req.body.userId

    });
    recipe.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//get specific recipe
app.get('/api/recipes/:id', (req, res, next) => {
    Recipe.findOne({
        _id: req.params.id
    }).then(
        (recipe) => {
            res.status(200).json(recipe);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});


//update recipe
app.put('/api/recipes/:id', (req, res, next) => {
    const recipe = new Recipe({
        _id: req.params.id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        difficulty: req.body.difficulty,
        time: req.body.time,
        userId: req.body.userId
    });
    Recipe.updateOne({ _id: req.params.id }, recipe).then(
        () => {
            res.status(201).json({
                message: 'Recipe updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//delete recipe
app.delete('/api/recipes/:id', (req, res, next) => {
    Recipe.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});



//get all recipes
app.use('/api/recipes', (req, res, next) => {
    Recipe.find().then(
        (recipes) => {
            res.status(200).json(recipes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
})

// app.use('/api/recipes', (req, res, next) => {
//     const stuff = [
//         {
//             _id: 'y67667u',
//             title: 'Vanilla Birthday Cake',
//             ingredients: '3 cups (425g/15oz) cake flour,1 whole egg , at room temperature ',
//             instruction: 'Heat oven to 350 degrees. Butter and line three 6-inch cake pans with parchment paper.',
//             difficulty: 2,
//             time: 20,
//         },
//         {
//             _id: 'y676t5r',
//             title: 'Nigerian Fried Rice',
//             ingredients: '2 Cups cooked Rice,1 Cup Mixed Vegetables,1 cup Onion diced',
//             instruction: 'Heat oven to 350 degrees. Butter and line three 6-inch cake pans with parchment paper.',
//             difficulty: 3,
//             time: 30,
//         }

//     ];
//     res.status(200).json(stuff)
// })

module.exports = app;