const fabMixin = {
  created() {
    let timer = null;
    window.addEventListener(
      "scroll",
      () => {
        this.hideFAB();
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(this.showFAB, 450);
      },
      false
    );
  },
  data() {
    return {
      FAB: true
    };
  },
  methods: {
    hideFAB() {
      this.FAB = false;
    },
    showFAB() {
      this.FAB = true;
    }
  }
};

export { fabMixin };
