'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const meta = require('./meta')({});

const path = require('path');
const glob = require('glob');
const match = require('minimatch');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument('appname', {
      type: String,
      required: true,
      desc: 'Name of application'
    });

    this.option('skip-install', { required: false, type: Boolean, default: false });

    // And you can then access it later; e.g.
    // this.log(this.options.appname);
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the divine ${chalk.red('Moleculer project')} generator!`));

    const prompts = meta.questions;

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      props.redis = props.cacher === 'Redis' || props.transporter === 'Redis';
      props.hasDepends =
        (props.needCacher && props.cacher !== 'Memory') || (props.needTransporter && props.transporter !== 'TCP');
      props.year = new Date().getFullYear();
      props.projectName = this.options.appname;

      this.props = props;
    });
  }

  writing() {
    let files = glob.sync(path.join(this.sourceRoot(), '**', '*'), { nodir: true });

    Object.keys(meta.filters).forEach(f => {
      files = files.filter(file => {
        const relPath = path.relative(this.sourceRoot(), file);
        if (match(relPath, f, { dot: true })) {
          const condition = meta.filters[f];
          return this._evaluate(condition, this.props);
        }
        return true;
      });
    });

    // This.log("Filtered", files);
    // this.log("Destination:", this.destinationRoot());

    // console.log("Props:", this.props);
    files.forEach(file => {
      const relPath = path.relative(this.sourceRoot(), file);
      if (['.png', '.jpg', '.gif', '.ico'].indexOf(path.extname(file).toLowerCase()) === -1) {
        // This.log(`Copy '${file}' to '${this.destinationPath(relPath)}'`);
        this.fs.copyTpl(file, this.destinationPath(relPath), this.props);
      } else {
        // This.log(`Copy '${file}'`);
        this.fs.copy(file, this.destinationPath(relPath), this.props);
      }
    });
  }

  _evaluate(exp, data) {
    /* eslint-disable no-new-func */
    const fn = new Function('data', 'with (data) { return ' + exp + '}');
    try {
      return fn(data);
    } catch (e) {
      console.error(chalk.red('Error when evaluating filter condition: ' + exp));
    }
  }

  // _copy(from, to) {
  //   this.fs.copy(this.templatePath(from), this.destinationPath(to));
  // }

  // _copyTpl(from, to) {
  //   this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this.props);
  // }

  install() {
    if (!this.options['skip-install']) this.installDependencies({ bower: false, npm: true });
  }

  end() {
    this.log(yosay(`Project ${chalk.red(this.props.projectName)} is done!`));
  }
};
