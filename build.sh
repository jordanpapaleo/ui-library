#!/bin/bash
# major | minor | patch
VERSION_TYPE="$1"

deployCheck() {
  ALLOWED_VERSIONS="patch minor major"

  if [[ ! " $ALLOWED_VERSIONS " =~ " $VERSION_TYPE " ]]; then
    echo "Unknown version type \"$VERSION_TYPE\""
    echo "Known version types: $ALLOWED_VERSIONS"
    exit 0
  fi

  GITSTATUS=$(git status -s)

  if [ ! -z "$GITSTATUS" ]; then
    echo "You have uncommitted changes; bailing out."
    exit 0
  fi

  npm test
}

build() {
  # Build library
  rm -rf dist/*; NODE_ENV=production ./node_modules/.bin/webpack &&

  # build static site
  build-storybook -c .storybook -o docs
}

bumpVersion() {
  echo "version bump type $VERSION_TYPE"
  echo "Docs built"

  git add . &&
  git commit -am "$VERSION_TYPE build"
  npm version $VERSION_TYPE;
}

finish() {
  git push origin master --tags && npm publish --access=public
}

deployCheck && build && bumpVersion && finish
