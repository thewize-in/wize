import { mapActions } from "vuex";

const nextEntryMixin = {
  methods: {
    ...mapActions("entrybook", ["nextEntry", "getEntryBook"]),
    ...mapActions("ui", [
      "displaySnackbarForInfo",
      "displaySnackbarForSuccess",
      "displaySnackbarForFailure"
    ]),

    async callNextEntry() {
      this.dialog = false;
      const res = await this.nextEntry(this.isDone);
      if (res) {
        this.loading = false;
        const message = this.isDone
          ? "ENTRY ADDED TO DONE LIST"
          : "ENTRY ADDED TO UNDONE LIST";
        this.displaySnackbarForSuccess(message);
      } else {
        this.loading = false;
        this.displaySnackbarForInfo("NO MORE ENTRIES.");
      }
    },

    async searchEntryByNumber(number, list) {
      return list.some(entry => entry.number === number);
    },
    async validateBeforeNextEntry() {
      let result = false;
      if (!(this.stats.current < this.stats.total)) {
        if (this.stats.current === this.stats.total) {
          result = await this.searchEntryByNumber(
            this.stats.current,
            this.donePatients
          );
          if (!result) {
            result = await this.searchEntryByNumber(
              this.stats.current,
              this.undonePatients
            );
          }
        }
      }
      if (result) {
        this.displaySnackbarForInfo("NO MORE ENTRIES.");
        return;
      } else {
        this.dialog = true;
      }
    }
  }
};

export { nextEntryMixin };
