gh-pages-test
=============

test to use only gh-pages branch

```
mkdir gh-pages-test
cd gh-pages-test/

repository=$(basename $(pwd) )
git init
git remote add origin git@github.com:jipodine/${repository}.git
git setgithub
# add some files
ls
git add *
git commit -m "initial import"
git branch gh-pages
git checkout gh-pages
# Create repository on github
git push -u origin gh-pages
```
