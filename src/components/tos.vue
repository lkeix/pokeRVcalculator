<template>
  <div style="background-color: #CFD8DC;">
    <v-card
      class="mx-auto overflow-hidden"
    >
      <v-app-bar
        dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>ポケモン実数値 カリキュレータ</v-toolbar-title>
      </v-app-bar>
      <div style="margin: 15px;">
        <v-card>
          <v-card-title>
            <h2>利用規約</h2>
          </v-card-title>
          <v-card-text>
            本サービスを利用していただく上でユーザの皆様には以下の規約に同意していただく同意していただく必要があります。
          </v-card-text>
          <v-card-title>
            <h3>適用</h3>
          </v-card-title>
          <v-card-text>
            1. 利用規約については、本サービスの運営者とユーザのみなさまとの間の権利義務関係を定めることを目的とし、本サービスの利用に関わる際に適用されます。
          </v-card-text>
          <v-card-title>
            <h3>禁止行為</h3>
          </v-card-title>
          <v-card-title>
            <h4>ユーザのみなさまは本サービスの利用の際に、以下の行為をすることを禁止します。</h4>
          </v-card-title>
          <v-card-text>
            1. 法令に違反する行為または公序良俗に反する行為
          </v-card-text>
          <v-card-text>
            2. 本サービス，その他の第三者の知的財産権、肖像権、プライバシーの権利、名誉、その他の権利や利益を侵害する行為
          </v-card-text>
          <v-card-text>
            3. 本サービスの運営を妨害するおそれのある行為
          </v-card-text>
          <v-card-text>
            4. 本サービスのシステム等に過度な負荷をかける行為
          </v-card-text>
          <v-card-text>
            5. サイト運営者が事前に許諾しない本サービス上での営利行為
          </v-card-text>
          <v-card-text>
            6. 本サービスの利用者の情報の収集
          </v-card-text>
          <v-card-text>
            7. その他、サイト運営者が不適切と判断する行為
          </v-card-text>
          <v-card-title>
            <h2>権利帰属</h2>
          </v-card-title>
          <v-card-text>
            本サービスの独自の文章やツールの所有権及び知的財産権はサイト運営者に帰属します。
          </v-card-text>
          <v-card-text>
            ポケットモンスター・ポケモン・Pokémonは任天堂・クリーチャーズ・ゲームフリークの登録商標であり、本サイトと左記の企業との関連性はありません。
          </v-card-text>
          <v-card-title>
            <h2>サービスの停止，変更について</h2>
          </v-card-title>
          <v-card-text>
            本サービスは、サイト運営者の都合によりユーザのみなさまへの事前の告知無しにサービスを停止、変更する場合があります。
          </v-card-text>
        </v-card>
      </div>
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
            <v-list-item @click="redirect('/', false)">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>実数値 カリキュレータ</v-list-item-title>
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
export default {
  created() {
    this.window_height = window.innerHeight
  },
  data: () => ({
    drawer: false,
    window_height: 500,
    twitterlink: "https://twitter.com/c_ade_",
    githublink: ""
  }),
  methods: {
    redirect(link, out) {
      if (!out) {
        this.$router.push({ path: link })
      } else {
        window.location = link
      }
    }
  }
}
</script>