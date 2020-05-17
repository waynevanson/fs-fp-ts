/**
 * @since 0.0.0
 */
export type Time = string | number | Date;

/**
 * @since 0.0.0
 */
export type FileDescriptor = number;

/**
 * @summary
 *
 *
 * @description
 *  - `a` - Open file for appending. The file is created if it does not exist.
 *  - `ax` - Like `a` but fails if the path exists.
 *  - `a+` - Open file for reading and appending.The file is created if it does not exist.
 *  - `ax+` - Like `a+` but fails if the path exists.
 *  - `as` - Open file for appending in synchronous mode. The file is created if it does not exist.
 *  - `as+` - Open file for reading and appending in synchronous mode. The file is created if it does not exist.
 *  - `r` - Open file for reading. An exception occurs if the file does not exist.
 *  - `r+` - Open file for reading and writing. An exception occurs if the file does not exist.
 *  - `rs+` - Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.
 *  - `w` - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
 *  - `wx` - Like `w` but fails if the path exists.
 *  - `w+` - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
 *  - `wx+` - Like `w+` but fails if the path exists.
 *
 * @todo
 * Create a separate type for each string literal so each has a description on hover.
 * A quick test proved that this doesn't work the way I expected it to.
 *
 *
 * @since 0.0.0
 */
export type FileSystemFlags =
  | "a"
  | "ax"
  | "a+"
  | "ax+"
  | "as"
  | "as+"
  | "r"
  | "r+"
  | "rs+"
  | "w"
  | "wx"
  | "w+"
  | "wx+";

/**
 * @summary
 * A range of numbers between `0o000` and `0o777`, which
 * are used in the `MODE` argument of `chmod` and `chown`.
 *
 * @description
 * For `0oxyz`, `x`, `y` and `z` must be within `0` to `7`.
 * `0o` is the notation for octal literals.
 *
 * `1`,`2` and `4` are the single permissions,
 * with the other numbers as the sum of these 3.
 *
 * - `0` - No permissions
 * - `1` - ___Executable___
 * - `2` - ___Writeable___
 * - `3` - Executable and Writeable
 * - `4` - ___Readable___
 * - `5` - Executable and Readable
 * - `6` - Readable and Writeable
 * - `7` - Executable, Readable and Writable
 *
 * It's the preferred way to write permissions as they're
 * easier to read compare to `fs.constants.*`
 *
 * @since 0.0.0
 */
export type Permissions =
  | 0o000
  | 0o001
  | 0o002
  | 0o003
  | 0o004
  | 0o005
  | 0o006
  | 0o010
  | 0o011
  | 0o012
  | 0o013
  | 0o014
  | 0o015
  | 0o016
  | 0o020
  | 0o021
  | 0o022
  | 0o023
  | 0o024
  | 0o025
  | 0o026
  | 0o030
  | 0o031
  | 0o032
  | 0o033
  | 0o034
  | 0o035
  | 0o036
  | 0o040
  | 0o041
  | 0o042
  | 0o043
  | 0o044
  | 0o045
  | 0o046
  | 0o050
  | 0o051
  | 0o052
  | 0o053
  | 0o054
  | 0o055
  | 0o056
  | 0o060
  | 0o061
  | 0o062
  | 0o063
  | 0o064
  | 0o065
  | 0o066
  | 0o070
  | 0o071
  | 0o072
  | 0o073
  | 0o074
  | 0o075
  | 0o076
  | 0o100
  | 0o101
  | 0o102
  | 0o103
  | 0o104
  | 0o105
  | 0o106
  | 0o110
  | 0o111
  | 0o112
  | 0o113
  | 0o114
  | 0o115
  | 0o116
  | 0o120
  | 0o121
  | 0o122
  | 0o123
  | 0o124
  | 0o125
  | 0o126
  | 0o130
  | 0o131
  | 0o132
  | 0o133
  | 0o134
  | 0o135
  | 0o136
  | 0o140
  | 0o141
  | 0o142
  | 0o143
  | 0o144
  | 0o145
  | 0o146
  | 0o150
  | 0o151
  | 0o152
  | 0o153
  | 0o154
  | 0o155
  | 0o156
  | 0o160
  | 0o161
  | 0o162
  | 0o163
  | 0o164
  | 0o165
  | 0o166
  | 0o170
  | 0o171
  | 0o172
  | 0o173
  | 0o174
  | 0o175
  | 0o176
  | 0o200
  | 0o201
  | 0o202
  | 0o203
  | 0o204
  | 0o205
  | 0o206
  | 0o210
  | 0o211
  | 0o212
  | 0o213
  | 0o214
  | 0o215
  | 0o216
  | 0o220
  | 0o221
  | 0o222
  | 0o223
  | 0o224
  | 0o225
  | 0o226
  | 0o230
  | 0o231
  | 0o232
  | 0o233
  | 0o234
  | 0o235
  | 0o236
  | 0o240
  | 0o241
  | 0o242
  | 0o243
  | 0o244
  | 0o245
  | 0o246
  | 0o250
  | 0o251
  | 0o252
  | 0o253
  | 0o254
  | 0o255
  | 0o256
  | 0o260
  | 0o261
  | 0o262
  | 0o263
  | 0o264
  | 0o265
  | 0o266
  | 0o270
  | 0o271
  | 0o272
  | 0o273
  | 0o274
  | 0o275
  | 0o276
  | 0o300
  | 0o301
  | 0o302
  | 0o303
  | 0o304
  | 0o305
  | 0o306
  | 0o310
  | 0o311
  | 0o312
  | 0o313
  | 0o314
  | 0o315
  | 0o316
  | 0o320
  | 0o321
  | 0o322
  | 0o323
  | 0o324
  | 0o325
  | 0o326
  | 0o330
  | 0o331
  | 0o332
  | 0o333
  | 0o334
  | 0o335
  | 0o336
  | 0o340
  | 0o341
  | 0o342
  | 0o343
  | 0o344
  | 0o345
  | 0o346
  | 0o350
  | 0o351
  | 0o352
  | 0o353
  | 0o354
  | 0o355
  | 0o356
  | 0o360
  | 0o361
  | 0o362
  | 0o363
  | 0o364
  | 0o365
  | 0o366
  | 0o370
  | 0o371
  | 0o372
  | 0o373
  | 0o374
  | 0o375
  | 0o376
  | 0o400
  | 0o401
  | 0o402
  | 0o403
  | 0o404
  | 0o405
  | 0o406
  | 0o410
  | 0o411
  | 0o412
  | 0o413
  | 0o414
  | 0o415
  | 0o416
  | 0o420
  | 0o421
  | 0o422
  | 0o423
  | 0o424
  | 0o425
  | 0o426
  | 0o430
  | 0o431
  | 0o432
  | 0o433
  | 0o434
  | 0o435
  | 0o436
  | 0o440
  | 0o441
  | 0o442
  | 0o443
  | 0o444
  | 0o445
  | 0o446
  | 0o450
  | 0o451
  | 0o452
  | 0o453
  | 0o454
  | 0o455
  | 0o456
  | 0o460
  | 0o461
  | 0o462
  | 0o463
  | 0o464
  | 0o465
  | 0o466
  | 0o470
  | 0o471
  | 0o472
  | 0o473
  | 0o474
  | 0o475
  | 0o476
  | 0o500
  | 0o501
  | 0o502
  | 0o503
  | 0o504
  | 0o505
  | 0o506
  | 0o510
  | 0o511
  | 0o512
  | 0o513
  | 0o514
  | 0o515
  | 0o516
  | 0o520
  | 0o521
  | 0o522
  | 0o523
  | 0o524
  | 0o525
  | 0o526
  | 0o530
  | 0o531
  | 0o532
  | 0o533
  | 0o534
  | 0o535
  | 0o536
  | 0o540
  | 0o541
  | 0o542
  | 0o543
  | 0o544
  | 0o545
  | 0o546
  | 0o550
  | 0o551
  | 0o552
  | 0o553
  | 0o554
  | 0o555
  | 0o556
  | 0o560
  | 0o561
  | 0o562
  | 0o563
  | 0o564
  | 0o565
  | 0o566
  | 0o570
  | 0o571
  | 0o572
  | 0o573
  | 0o574
  | 0o575
  | 0o576
  | 0o600
  | 0o601
  | 0o602
  | 0o603
  | 0o604
  | 0o605
  | 0o606
  | 0o610
  | 0o611
  | 0o612
  | 0o613
  | 0o614
  | 0o615
  | 0o616
  | 0o620
  | 0o621
  | 0o622
  | 0o623
  | 0o624
  | 0o625
  | 0o626
  | 0o630
  | 0o631
  | 0o632
  | 0o633
  | 0o634
  | 0o635
  | 0o636
  | 0o640
  | 0o641
  | 0o642
  | 0o643
  | 0o644
  | 0o645
  | 0o646
  | 0o650
  | 0o651
  | 0o652
  | 0o653
  | 0o654
  | 0o655
  | 0o656
  | 0o660
  | 0o661
  | 0o662
  | 0o663
  | 0o664
  | 0o665
  | 0o666
  | 0o670
  | 0o671
  | 0o672
  | 0o673
  | 0o674
  | 0o675
  | 0o676
  | 0o700
  | 0o701
  | 0o702
  | 0o703
  | 0o704
  | 0o705
  | 0o706
  | 0o710
  | 0o711
  | 0o712
  | 0o713
  | 0o714
  | 0o715
  | 0o716
  | 0o720
  | 0o721
  | 0o722
  | 0o723
  | 0o724
  | 0o725
  | 0o726
  | 0o730
  | 0o731
  | 0o732
  | 0o733
  | 0o734
  | 0o735
  | 0o736
  | 0o740
  | 0o741
  | 0o742
  | 0o743
  | 0o744
  | 0o745
  | 0o746
  | 0o750
  | 0o751
  | 0o752
  | 0o753
  | 0o754
  | 0o755
  | 0o756
  | 0o760
  | 0o761
  | 0o762
  | 0o763
  | 0o764
  | 0o765
  | 0o766
  | 0o770
  | 0o771
  | 0o772
  | 0o773
  | 0o774
  | 0o775
  | 0o776;
