<template>
  <div style="background-color: #CFD8DC;">
    <v-card
      class="mx-auto overflow-hidden"
    >
      <v-app-bar
        dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Pokemon RV Calclator</v-toolbar-title>
      </v-app-bar>

      <v-card v-if="!phone">
        <v-card-title></v-card-title>
        <v-row>
          <v-col cols="1" />
          <v-col cols="8">
            <v-card-actions>
              <v-autocomplete
              v-model="id"  
              :items="pokemons"
              item-text="name"
              item-value="id"
              dense
              filled
              label="ポケモンを選択"
              ></v-autocomplete>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col cols="4">
            <v-card-actions>
              <v-text-field type="number" label="レベル" v-model="lv"></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col cols="3" style="text-align: center;">
            <v-card-actions>
              <v-btn color="primary" @click="setlevel(50)">50 Lv</v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="3" style="text-align: center;">
            <v-card-actions>
              <v-btn color="primary" @click="setlevel(100)">100 Lv</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col cols="8">
            <v-select
            @input="charset"
            :items="chars"
            item-text="char"
            item-value="id"
            filled
            label="性格"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col cols="4">
            <v-checkbox v-model="fix510" label="努力値を510で設定" />
          </v-col>
          <v-col cols="3" />
          <v-col cols="4" v-if="fix510">
            <v-card-text>
              <span style="font-size: 20px;">残り {{510 - sum}}</span>
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col cols="2">
            <v-card-actions>
              <v-text-field type="number" label="HP個体値" :disabled="fix.HP" v-model="iv.HP" :rules="[rules.iv.required, rules.iv.valeval]" ></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col cols="2" v-if="!phone">
            <v-card-actions>
              <v-text-field type="number" label="HP努力値" :disabled="fix.HP" v-model="ev.HP" :rules="[rules.ev.valeval]"></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col :cols="slidercol">
            <v-card-actions>
              <v-slider
                v-model="ev.HP"
                :readonly="fix.HP"
                min="0"
                :max="evMax.HP"
                ticks
                step=4
                thumb-label="always"
              ></v-slider>
            </v-card-actions>
          </v-col>
          <v-col :cols="checkcol">
            <v-card-actions>
              <v-checkbox label="固定" @click="fix.HP = !fix.HP" />
            </v-card-actions>
          </v-col>
          <v-col cols="2">
            <v-card-text style="text-align: center; font-size: 28px;">
              {{value.HP}}
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col cols="2" style="font-size: 21px;">
            <v-card-actions>
              <v-text-field type="number" label="A個体値" :disabled="fix.A" v-model="iv.A" :rules="[rules.iv.required, rules.iv.valeval]"></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col cols="2" v-if="!phone">
            <v-card-actions>
              <v-text-field type="number" label="A努力値" :disabled="fix.A" v-model="ev.A" :rules="[rules.ev.valeval]"></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col :cols="slidercol">
            <v-card-actions>
              <v-slider
                v-model="ev.A"
                :readonly="fix.A"
                min="0"
                :max="evMax.A"
                step=4
                thumb-label="always"
              ></v-slider>
            </v-card-actions>
          </v-col>
          <v-col :cols="checkcol">
            <v-card-actions>
              <v-checkbox label="固定" @click="fix.A = !fix.A" />
            </v-card-actions>
          </v-col>
          <v-col cols="2">
            <v-card-text style="text-align: center; font-size: 28px;">
              {{value.A}}
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col cols="2" style="font-size: 21px;">
            <v-card-actions>
              <v-text-field type="number" label="B個体値" :disabled="fix.B" v-model="iv.B" :rules="[rules.iv.required, rules.iv.valeval]"></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col cols="2" v-if="!phone">
            <v-card-actions>
              <v-text-field type="number" label="B努力値" :disabled="fix.B" v-model="ev.B" :rules="[rules.ev.valeval]"></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col :cols="slidercol">
            <v-card-actions>
              <v-slider
                v-model="ev.B"
                :readonly="fix.B"
                min="0"
                :max="evMax.B"
                step=4
                thumb-label="always"
              ></v-slider>
            </v-card-actions>
          </v-col>
          <v-col :cols="checkcol">
            <v-card-actions>
              <v-checkbox label="固定" @click="fix.B = !fix.B" />
            </v-card-actions>
          </v-col>
          <v-col cols="2">
            <v-card-text style="text-align: center; font-size: 28px;">
              {{value.B}}
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col cols="2">
            <v-card-actions>
              <v-text-field type="number" label="C個体値" v-model="iv.C" :disabled="fix.C" :rules="[rules.iv.required, rules.iv.valeval]"></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col cols="2" v-if="!phone">
            <v-card-actions>
              <v-text-field type="number" label="C努力値" v-model="ev.C" :disabled="fix.C" :rules="[rules.ev.valeval]"></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col :cols="slidercol">
            <v-card-actions>
              <v-slider
                v-model="ev.C"
                :readonly="fix.C"
                min="0"
                :max="evMax.C"
                step=4
                thumb-label="always"
              ></v-slider>
            </v-card-actions>
          </v-col>
          <v-col :cols="checkcol">
            <v-card-actions>
              <v-checkbox label="固定" @click="fix.C = !fix.C" />
            </v-card-actions>
          </v-col>
          <v-col cols="2">
            <v-card-text style="text-align: center; font-size: 28px;">
              {{value.C}}
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col cols="2" style="font-size: 21px;">
            <v-card-actions>
              <v-text-field type="number" label="D個体値" v-model="iv.D" :disabled="fix.D" :rules="[rules.iv.required, rules.iv.valeval]"></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col cols="2" v-if="!phone">
            <v-card-actions>
              <v-text-field type="number" label="D努力値" v-model="ev.D" :disabled="fix.D" :rules="[rules.ev.valeval]"></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col :cols="slidercol">
            <v-card-actions>
              <v-slider
                v-model="ev.D"
                :readonly="fix.D"
                min="0"
                :max="evMax.D"
                step=4
                thumb-label="always"
              ></v-slider>
            </v-card-actions>
          </v-col>
          <v-col :cols="checkcol">
            <v-card-actions>
              <v-checkbox label="固定" @click="fix.D = !fix.D" />
            </v-card-actions>
          </v-col>
          <v-col cols="2">
            <v-card-text style="text-align: center; font-size: 28px;">
              {{value.D}}
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col cols="2">
            <v-card-actions>
              <v-text-field type="number" label="S個体値" v-model="iv.S" :disabled="fix.S" :rules="[rules.iv.required, rules.iv.valeval]"></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col cols="2" v-if="!phone">
            <v-card-actions>
              <v-text-field type="number" label="S努力値" v-model="ev.S" :disabled="fix.S" :rules="[rules.ev.valeval]"></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col :cols="slidercol">
            <v-card-actions>
              <v-slider
                v-model="ev.S"
                :readonly="fix.S"
                min="0"
                :max="evMax.S"
                step=4
                thumb-label="always"
              ></v-slider>
            </v-card-actions>
          </v-col>
          <v-col :cols="checkcol">
            <v-card-actions>
              <v-checkbox label="固定" @click="fix.S = !fix.S" />
            </v-card-actions>
          </v-col>
          <v-col cols="2">
            <v-card-text style="text-align: center; font-size: 28px;">
              {{value.S}}
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="phone ? 4 : 5" />
          <v-col cols=3>
            <v-btn color="primary" @click="calcother">固定した値の他の候補を計算する</v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-else>
        <v-card-title></v-card-title>
        <v-row>
          <v-col cols="1" />
          <v-col cols="8">
            <v-card-actions>
              <v-autocomplete
              v-model="id"  
              :items="pokemons"
              item-text="name"
              item-value="id"
              dense
              filled
              label="ポケモンを選択"
              ></v-autocomplete>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col cols="4">
            <v-card-actions>
              <v-text-field type="number" label="レベル" v-model="lv"></v-text-field>
            </v-card-actions>
          </v-col>
          <v-col cols="3" style="text-align: center;">
            <v-card-actions>
              <v-btn color="primary" @click="setlevel(50)">50 Lv</v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="3" style="text-align: center;">
            <v-card-actions>
              <v-btn color="primary" @click="setlevel(100)">100 Lv</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col cols="8">
            <v-autocomplete
            @input="charset"
            :items="chars"
            item-text="char"
            item-value="id"
            filled
            label="性格"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col>
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="scale-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  個体値、努力値の確認と設定
                </v-btn>
              </template>
              <v-card>
                <v-toolbar dark>
                  <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>個体値と努力値</v-toolbar-title>
                </v-toolbar>
                <v-list three-line subheader>
                  <v-list-item>
                    {{pokemon.name}}
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item>
                    個体値
                  </v-list-item>
                  <v-list-item>
                    <v-col cols=6>
                      <v-text-field type="number" label="HP個体値" :disabled="fix.HP" v-model="iv.HP" :rules="[rules.iv.required, rules.iv.valeval]" ></v-text-field>
                    </v-col>
                    <v-col cols=6>
                      <v-text-field type="number" label="HP努力値" :disabled="fix.HP" v-model="ev.HP" :rules="[rules.ev.valeval]"></v-text-field>
                    </v-col>
                  </v-list-item>

                  <v-list-item>
                    <v-col cols=6>
                      <v-text-field type="number" label="A個体値" :disabled="fix.A" v-model="iv.A" :rules="[rules.iv.required, rules.iv.valeval]" ></v-text-field>
                    </v-col>
                    <v-col cols=6>
                      <v-text-field type="number" label="A努力値" :disabled="fix.A" v-model="ev.A" :rules="[rules.ev.valeval]"></v-text-field>
                    </v-col>
                  </v-list-item>

                  <v-list-item>
                    <v-col cols=6>
                      <v-text-field type="number" label="B個体値" :disabled="fix.B" v-model="iv.B" :rules="[rules.iv.required, rules.iv.valeval]" ></v-text-field>
                    </v-col>
                    <v-col cols=6>
                      <v-text-field type="number" label="B努力値" :disabled="fix.B" v-model="ev.B" :rules="[rules.ev.valeval]"></v-text-field>
                    </v-col>
                  </v-list-item>

                  <v-list-item>
                    <v-col cols=6>
                      <v-text-field type="number" label="C個体値" :disabled="fix.C" v-model="iv.C" :rules="[rules.iv.required, rules.iv.valeval]" ></v-text-field>
                    </v-col>
                    <v-col cols=6>
                      <v-text-field type="number" label="C努力値" :disabled="fix.C" v-model="ev.C" :rules="[rules.ev.valeval]"></v-text-field>
                    </v-col>
                  </v-list-item>

                  <v-list-item>
                    <v-col cols=6>
                      <v-text-field type="number" label="D個体値" :disabled="fix.D" v-model="iv.D" :rules="[rules.iv.required, rules.iv.valeval]" ></v-text-field>
                    </v-col>
                    <v-col cols=6>
                      <v-text-field type="number" label="D努力値" :disabled="fix.D" v-model="ev.D" :rules="[rules.ev.valeval]"></v-text-field>
                    </v-col>
                  </v-list-item>

                  <v-list-item>
                    <v-col cols=6>
                      <v-text-field type="number" label="S個体値" :disabled="fix.S" v-model="iv.S" :rules="[rules.iv.required, rules.iv.valeval]" ></v-text-field>
                    </v-col>
                    <v-col cols=6>
                      <v-text-field type="number" label="S努力値" :disabled="fix.S" v-model="ev.S" :rules="[rules.ev.valeval]"></v-text-field>
                    </v-col>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" />
          <v-col cols="4">
            <v-checkbox v-model="fix510" label="努力値を510で設定" />
          </v-col>
          <v-col cols="3" />
          <v-col cols="4" v-if="fix510">
            <v-card-text>
              <span style="font-size: 20px;">残り {{510 - sum}}</span>
            </v-card-text>
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col cols=6>
            <v-card-actions>
              <v-slider
                v-model="ev.HP"
                :readonly="fix.HP"
                min="0"
                :max="evMax.HP"
                step=4
                thumb-label="always"
                inverse-label
                label="HP"
              ></v-slider>
            </v-card-actions>
          </v-col>
          <v-col cols=3>
            <v-card-actions>
              <v-checkbox label="固定" @click="fix.HP = !fix.HP" />
            </v-card-actions>
          </v-col>
          <v-col cols=3>
            <v-card-text style="text-align: center; font-size: 24px;">
              {{value.HP}}
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols=6>
            <v-card-actions>
              <v-slider
                v-model="ev.A"
                :readonly="fix.A"
                min="0"
                :max="evMax.A"
                step=4
                thumb-label="always"
                inverse-label
                label="A"
              ></v-slider>
            </v-card-actions>
          </v-col>
          <v-col cols=3>
            <v-card-actions>
              <v-checkbox label="固定" @click="fix.A = !fix.A" />
            </v-card-actions>
          </v-col>
          <v-col cols=3>
            <v-card-text style="text-align: center; font-size: 24px;">
              {{value.A}}
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols=6>
            <v-card-actions>
              <v-slider
                v-model="ev.B"
                :readonly="fix.B"
                min="0"
                :max="evMax.B"
                step=4
                thumb-label="always"
                inverse-label
                label="B"
              ></v-slider>
            </v-card-actions>
          </v-col>
          <v-col cols=3>
            <v-card-actions>
              <v-checkbox label="固定" @click="fix.B = !fix.B" />
            </v-card-actions>
          </v-col>
          <v-col cols=3>
            <v-card-text style="text-align: center; font-size: 24px;">
              {{value.B}}
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols=6>
            <v-card-actions>
              <v-slider
                v-model="ev.C"
                :readonly="fix.C"
                min="0"
                :max="evMax.C"
                step=4
                thumb-label="always"
                inverse-label
                label="C"
              ></v-slider>
            </v-card-actions>
          </v-col>
          <v-col cols=3>
            <v-card-actions>
              <v-checkbox label="固定" @click="fix.C = !fix.C" />
            </v-card-actions>
          </v-col>
          <v-col cols=3>
            <v-card-text style="text-align: center; font-size: 24px;">
              {{value.C}}
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols=6>
            <v-card-actions>
              <v-slider
                v-model="ev.D"
                :readonly="fix.D"
                min="0"
                :max="evMax.D"
                step=4
                thumb-label="always"
                inverse-label
                label="D"
              ></v-slider>
            </v-card-actions>
          </v-col>
          <v-col cols=3>
            <v-card-actions>
              <v-checkbox label="固定" @click="fix.D = !fix.D" />
            </v-card-actions>
          </v-col>
          <v-col cols=3>
            <v-card-text style="text-align: center; font-size: 24px;">
              {{value.D}}
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols=6>
            <v-card-actions>
              <v-slider
                v-model="ev.S"
                :readonly="fix.S"
                min="0"
                :max="evMax.S"
                step=4
                thumb-label="always"
                inverse-label
                label="S"
              ></v-slider>
            </v-card-actions>
          </v-col>
          <v-col cols=3>
            <v-card-actions>
              <v-checkbox label="固定" @click="fix.S = !fix.S" />
            </v-card-actions>
          </v-col>
          <v-col cols=3>
            <v-card-text style="text-align: center; font-size: 24px;">
              {{value.S}}
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols=2 />
          <v-col cols=3>
            <v-btn color="primary" @click="calcother">固定した値の他の候補を計算する</v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-dialog v-model="resdialog" max-width="75%" hide-overlay transition="scale-transition" v-if="!phone">
        <v-card>
          <v-toolbar dark>
            <v-btn icon dark @click="resdialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>その他の候補</v-toolbar-title>
          </v-toolbar>
          <v-card-title>この結果が必ず元の振り方より優れる訳ではありません。</v-card-title>
          <v-card-actions>
            <v-container>
              <v-row>
                <v-col cols=12>
                  <p>元の振り方</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols=12>
                  <p>{{char.char}}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols=2>
                  HP(努力値)
                </v-col>
                <v-col cols=2>
                  A(努力値)
                </v-col>
                <v-col cols=2>
                  B(努力値)
                </v-col>
                <v-col cols=2>
                  C(努力値)
                </v-col>
                <v-col cols=2>
                  D(努力値)
                </v-col>
                <v-col cols=2>
                  S(努力値)
                </v-col>
              </v-row>
              <v-row>
                <v-col cols=2>
                  {{value.HP}} ({{ev.HP}})
                </v-col>
                <v-col cols=2>
                  {{value.A}} ({{ev.A}})
                </v-col>
                <v-col cols=2>
                  {{value.B}} ({{ev.B}})
                </v-col>
                <v-col cols=2>
                  {{value.C}} ({{ev.C}})
                </v-col>
                <v-col cols=2>
                  {{value.D}} ({{ev.D}})
                </v-col>
                <v-col cols=2>
                  {{value.S}} ({{ev.S}})
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
          <v-divider />
          <v-card-actions v-for="item in candidations" v-bind:key="item.id">
            <v-container>
              <v-row>
                <v-col cols=12>
                  <p>{{item.char}}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols=2>
                  {{item.HP}} ({{item.ev.HP}})
                </v-col>
                <v-col cols=2>
                  {{item.A}} ({{item.ev.A}})
                </v-col>
                <v-col cols=2>
                  {{item.B}} ({{item.ev.B}})
                </v-col>
                <v-col cols=2>
                  {{item.C}} ({{item.ev.C}})
                </v-col>
                <v-col cols=2>
                  {{item.D}} ({{item.ev.D}})
                </v-col>
                <v-col cols=2>
                  {{item.S}} ({{item.ev.S}})
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="resdialog" fullscreen hide-overlay transition="scale-transition" v-if="phone">
        <v-card>
          <v-toolbar dark>
            <v-btn icon dark @click="resdialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>その他の候補</v-toolbar-title>
          </v-toolbar>
          <v-card-title>この結果が必ず元の振り方より優れる訳ではありません。</v-card-title>
          <v-card-actions>
            <v-container>
              <v-row>
                <v-col cols=12>
                  <p>元の振り方</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols=12>
                  <p>{{char.char}}</p>
                </v-col>
              </v-row>
              <v-row style="text-align: right">
                <v-col cols=4>
                  HP(努力値)
                </v-col>
                <v-col cols=6>
                   {{value.HP}} ({{ev.HP}})
                </v-col>
                <v-col cols=4>
                  A(努力値)
                </v-col>
                <v-col cols=6>
                  {{value.A}} ({{ev.A}})
                </v-col>
                <v-col cols=4>
                  B(努力値)
                </v-col>
                <v-col cols=6>
                  {{value.B}} ({{ev.B}})
                </v-col>
                <v-col cols=4>
                  C(努力値)
                </v-col>
                <v-col cols=6>
                  {{value.C}} ({{ev.C}})
                </v-col>
                <v-col cols=4>
                  D(努力値)
                </v-col>
                <v-col cols=6>
                  {{value.D}} ({{ev.D}})
                </v-col>
                <v-col cols=4>
                  S(努力値)
                </v-col>
                <v-col cols=6>
                  {{value.S}} ({{ev.S}})
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
          <v-divider />
          <v-card-actions v-for="item in candidations" v-bind:key="item.id">
            <v-container>
              <v-row>
                <v-col cols=12>
                  <p>{{item.char}}</p>
                </v-col>
              </v-row>
              <v-row style="text-align: right">
                <v-col cols=4>
                  HP(努力値)
                </v-col>
                <v-col cols=6>
                   {{item.HP}} ({{item.ev.HP}})
                </v-col>
                <v-col cols=4>
                  A(努力値)
                </v-col>
                <v-col cols=6>
                  {{item.A}} ({{item.ev.A}})
                </v-col>
                <v-col cols=4>
                  B(努力値)
                </v-col>
                <v-col cols=6>
                  {{item.B}} ({{item.ev.B}})
                </v-col>
                <v-col cols=4>
                  C(努力値)
                </v-col>
                <v-col cols=6>
                  {{item.C}} ({{item.ev.C}})
                </v-col>
                <v-col cols=4>
                  D(努力値)
                </v-col>
                <v-col cols=6>
                  {{item.D}} ({{item.ev.D}})
                </v-col>
                <v-col cols=4>
                  S(努力値)
                </v-col>
                <v-col cols=6>
                  {{item.S}} ({{item.ev.S}})
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item @click="redirect('/term-of-service', false)">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>利用規約</v-list-item-title>
            </v-list-item>

            <v-list-item @click="redirect(twitterlink, true)">
              <v-list-item-icon>
                <v-icon>mdi-twitter</v-icon>
              </v-list-item-icon>
              <v-list-item-title>開発者 Twitter</v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item @click="redirect(githublink , true)">
              <v-list-item-icon>
                <v-icon>mdi-file-document</v-icon>
              </v-list-item-icon>
              <v-list-item-title>GitHub</v-list-item-title>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import isMobile from 'ismobilejs'
import pokecalc from '@/lib/calc.js'
import other from '@/lib/other.js'
import data from '@/assets/pokemon_data.json'
import chardata from '@/assets/pokemon_char.json'

export default {
  created() {
    this.window_height = window.innerHeight
    this.phone = isMobile().phone
    if (this.phone) {
      this.slidercol = 4
      this.checkcol = 2
    }
    for(let i = 0;i < data.length; i++) {
      data[i].id = i;
    }
    for(let i = 0;i < chardata.length; i++) {
      chardata[i].id = i;
    }
    this.chars = chardata
    this.pokemons = data
  },
  data() {
    return {
      phone: false,
      drawer: false,
      dialog: false,
      resdialog: false,
      twitterlink: "https://twitter.com/c_ade_",
      githublink: "https://github.com/rxaru/pokeRVcalculator",
      pokemons: [],
      chars: [],
      char: {},
      id: {},
      candidations: [],
      value: {
        HP: 0,
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        S: 0
      },
      pokemon: {},
      lv: 50,
      sum: 0,
      fix510: false,
      fix: {
        HP: false,
        A: false,
        B: false,
        C: false,
        D: false,
        S: false
      },
      iv: {
        HP: 31,
        A: 31,
        B: 31,
        C: 31,
        D: 31,
        S: 31
      },
      ev: {
        HP: 0,
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        S: 0
      },
      evMax: {
        HP: 252,
        A: 252,
        B: 252,
        C: 252,
        D: 252,
        S: 252
      },
      rules: {
        iv: {
          required: value => !!value || '値を入力してください',
          valeval: v => v >= 0 && v <= 31 || '個体値は0以上31以下の値で決めてください'
        },
        ev: {
          valeval: v => v >= 0 && v <= 252 || '個体値は0以上252以下の値で決めてください'
        }
      },
      slidercol: 3,
      checkcol: 1,
      res: []
    }
  },
  watch: {
    fix510(nv) {
      if(!nv) {
        this.evMax.HP = 252
        this.evMax.A = 252
        this.evMax.B = 252
        this.evMax.C = 252
        this.evMax.D = 252
        this.evMax.S = 252
      }
    },
    ev: {
      handler() {
        this.calc()
        this.sum = this.ev.HP + this.ev.A + this.ev.B + this.ev.C + this.ev.D + this.ev.S
        if (this.fix510) {
          this.evMax.HP = this.calcleave('H')
          this.evMax.A = this.calcleave('A')
          this.evMax.B = this.calcleave('B')
          this.evMax.C = this.calcleave('C')
          this.evMax.D = this.calcleave('D')
          this.evMax.S = this.calcleave('S')
        }
      },
      deep: true
    },
    id(nv) {
      this.pokemon = this.pokemons[nv]
      this.calc()
    }
  },
  methods: {
    redirect(link, out) {
      if (!out) {
        this.$router.push({ path: link })
      } else {
        window.location = link
      }
    },
    setlevel(lv) {
      this.lv = lv
    },
    calcleave(itr) {
      let sum = this.ev.HP + this.ev.A + this.ev.B + this.ev.C + this.ev.D + this.ev.S
      if(itr === 'H') {
        sum -= this.ev.HP
      } else if(itr === 'A') {
        sum -= this.ev.A
      } else if(itr === 'B') {
        sum -= this.ev.B
      } else if(itr === 'C') {
        sum -= this.ev.C
      } else if(itr === 'D') {
        sum -= this.ev.D
      } else if(itr === 'S') {
        sum -= this.ev.S
      }
      return 510 - sum > 252 ? 252 : 510 - sum
    },
    calc(){
      this.value = pokecalc(this.pokemon, this.iv, this.ev, this.lv, this.char.plus, this.char.minus)
    },
    charset(id) {
      this.char = this.chars[id]
      this.calc()
    },
    calcother() {
      let fix = []
      if(this.fix.A) {
        fix.push('A')
      }
      if(this.fix.C) {
        fix.push('C')
      }
      if(this.fix.S) {
        fix.push('S')
      }
      if(this.fix.HP) {
        fix.push('H')
      }
      if(this.fix.B) {
        fix.push('B')
      }
      if(this.fix.D) {
        fix.push('D')
      }
      this.res = other(this.pokemon, this.char, this.iv, this.value, this.chars, this.lv, this.fix)
      this.res = [this.res[0], this.res[1], this.res[2], this.res[3], this.res[4]]
      this.candidations = []
      for(let i = 0; i < this.res.length; i++) {
        for(let j = 0;j < this.chars.length; j++) {
          if(this.res[i].char === this.chars[j].char) {
            let tmp = pokecalc(this.pokemon, this.iv, this.res[i], this.lv, this.chars[j].plus, this.chars[j].minus)
            tmp.char = this.chars[j].char
            tmp.ev = this.res[i]
            this.candidations.push(tmp)
          }
        }
      }
      this.resdialog = true
    }
  }
}
</script>