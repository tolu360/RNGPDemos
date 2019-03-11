# Sample App for [react-native-google-places BETA](https://github.com/tolu360/react-native-google-places)

### Go to the [README](https://github.com/tolu360/react-native-google-places/blob/master/BETA_README.md)

### Running Sample
- Install NPM modules:

```bash
yarn
```
- Install iOS CocoaPod dependencies, run the following from the `/ios` directory:

```bash
pod install
```

- Define a system variable represnting your Android API key e.g. on a Unix/Mac terminal run:

```bash
export RNGP_ANDRIOD_API_KEY=Insert_API_KEY_here
```
- You may need to export this system/environment variable before every build or add them to your `~/.bash_profile` file or similar files.
- For iOS, run the following from the `/ios` directory:

```bash
bundle exec pod keys set "rNGP_IOS_API_KEY" "Insert_API_KEY_here" 
```