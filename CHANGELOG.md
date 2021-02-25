# 1.0.0 (2021-02-25)


### Bug Fixes

* changes filemodes to filemode ([462a050](http://github.com/waynevanson/fs-fp-ts/commit/462a05049532e093e37440b22818853f4ece7059))
* changes path of ../types to ./types ([5430f94](http://github.com/waynevanson/fs-fp-ts/commit/5430f9446457b301dd595fdf19ccbe3e1cc72be5))
* changes test-utils rReadFile to return a string ([6b22fdd](http://github.com/waynevanson/fs-fp-ts/commit/6b22fdd341a6048e84da583b89058e38c980ee90))
* default param for access modes ([cdd546d](http://github.com/waynevanson/fs-fp-ts/commit/cdd546d3f8cd647dc4d72732ea1cd98e7e722357))
* ensure some overloads and expected ([7509b8c](http://github.com/waynevanson/fs-fp-ts/commit/7509b8ce8b6bbe5b7dfea09b3313db666dcc4e85))
* last overload is respected ([7f9e008](http://github.com/waynevanson/fs-fp-ts/commit/7f9e0086488ba203f84cbc3e640f178ee5a48a8c))
* open as a single flag,not an array ([dda4dbb](http://github.com/waynevanson/fs-fp-ts/commit/dda4dbb627ff110d37577bcdac386dcd3cadcb6a))
* remove exists ([201f121](http://github.com/waynevanson/fs-fp-ts/commit/201f121c9debf5f50c7c2f32dd582582312be568))
* rename pahtlike to fileedscriptor ([662eceb](http://github.com/waynevanson/fs-fp-ts/commit/662eceb1bb33d5356639bc1c350c9dcc49d35248))
* use unknown instead of any ([2a11475](http://github.com/waynevanson/fs-fp-ts/commit/2a1147579ba04afa4a320859dadbafcbeffa68f2))


### Build System

* removes types from old API ([52244f6](http://github.com/waynevanson/fs-fp-ts/commit/52244f6efaff16b5232d53b94b1fe1e43aaf1629))


### deps

* delete old API ([406ce4a](http://github.com/waynevanson/fs-fp-ts/commit/406ce4af719c018822cde00154f5839fb265f1a0))


### Features

* add overlaoded lutimes ([deba443](http://github.com/waynevanson/fs-fp-ts/commit/deba443c019a845513c7227fffcfc70e7b4286fe))
* add overloaded lchown ([72edc50](http://github.com/waynevanson/fs-fp-ts/commit/72edc506c1b8c47987bd8fd620d6118e01c1aae7))
* add overloaded link ([fc0abb0](http://github.com/waynevanson/fs-fp-ts/commit/fc0abb0484ddb762977e28cabdc3eb4358b63deb))
* add overloaded lstat ([0bcfdb4](http://github.com/waynevanson/fs-fp-ts/commit/0bcfdb4935680be5d1c7edd7e2394c6e47ebf35f))
* add overloaded mkdir ([ca84c3a](http://github.com/waynevanson/fs-fp-ts/commit/ca84c3a0fd5aed59c0efb99a359381d9c0cc8e45))
* add overloads for lchmod ([d69fbec](http://github.com/waynevanson/fs-fp-ts/commit/d69fbeccf8b3b0cf797b3ca0f6bafd2e3e223760))
* add readfile ([92d0132](http://github.com/waynevanson/fs-fp-ts/commit/92d01320b142b66f2a2299fd7c1ef0a6a0959a45))
* add unlink ([363d73c](http://github.com/waynevanson/fs-fp-ts/commit/363d73c84362de65dc4187be57659337b88e3a98))
* adds fchown overloads ([943e915](http://github.com/waynevanson/fs-fp-ts/commit/943e9155b5c518eb3d6c122c88bcf9b65f5ab420))
* adds overloaded open ([041dac8](http://github.com/waynevanson/fs-fp-ts/commit/041dac8468445510de705d8a1282b111903b8abb))
* adds overloads to write file ([0efcc0f](http://github.com/waynevanson/fs-fp-ts/commit/0efcc0f92c4dcdb0d8e1218569dce86ef3dbc065))
* adds types and utilities ([f2f0fb1](http://github.com/waynevanson/fs-fp-ts/commit/f2f0fb16b1ffacd87d698e7e66a73881f29f6872))
* chown overloads ([928db8c](http://github.com/waynevanson/fs-fp-ts/commit/928db8cdb158d23fa2ab48cb0a0da871f12736f8))
* copy-file overloads ([bbb8bcd](http://github.com/waynevanson/fs-fp-ts/commit/bbb8bcdaea6d642b7e11ca9b5c059b3453776125))
* export PathLike type from entry ([bcedcfd](http://github.com/waynevanson/fs-fp-ts/commit/bcedcfde94a514a35b5f0cf6a01a70b7b67e0c03))
* export stuff ([329db2a](http://github.com/waynevanson/fs-fp-ts/commit/329db2a3c09bba8d2ef9e48ab7842f7af5d8ab86))
* fchmod overloads ([530a33d](http://github.com/waynevanson/fs-fp-ts/commit/530a33d16848d690bb83e9eb258542913ba257cd))
* fchmod overloads ([53526bd](http://github.com/waynevanson/fs-fp-ts/commit/53526bddda12e9e508972728de0916059e371614))
* implement access with new style options ([5eef2a4](http://github.com/waynevanson/fs-fp-ts/commit/5eef2a47ce329b88a523021c3491b044537e22d5))
* implements appendFile ([cdbb0eb](http://github.com/waynevanson/fs-fp-ts/commit/cdbb0ebc7d54f5d4ec8d5d27d481c5b0c8db769a))
* overloaded readdir ([a2639e9](http://github.com/waynevanson/fs-fp-ts/commit/a2639e9e66a8ed6ca646d41d7fd7b747be699a68))


### BREAKING CHANGES

* Just as earlier, another deletion of the old API
* The whole API has been rewritten, so nothing that worked previously should work
