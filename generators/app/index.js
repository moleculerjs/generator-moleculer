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
      props.hasDepends = props.needCacher || (props.needTransporter && props.transporter !== 'TCP');
      props.year = new Date().getFullYear();
      props.projectName = this.options.appname;

      this.props = props;
    });
  }

  writing() {
    // This.fs.copy(this.templatePath('dummyfile.txt'), this.destinationPath('dummyfile.txt'));
    let files = glob.sync(path.join(this.sourceRoot(), '**', '*'));

    Object.keys(meta.filters).forEach(f => {
      files = files.map(file => {
        if (match(file, f, { dot: true })) {
          const condition = meta.filters[f];
          return this._evaluate(condition, this.props);
        }
        return true;
      });
    });

    this.log(files);

    files.forEach(file => {
      const relPath = path.relative(this.sourceRoot, file);
      this.fs.copyTpl(file, this.destinationPath(relPath), this.props);
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
    this.installDependencies({ bower: false });
  }
};
