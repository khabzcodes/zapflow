export const MarketingPageFooter = () => {
  return (
    <footer className="border-grid border-t py-6 md:px-8 md:py-0">
      <div className="container-wrapper">
        <div className="container py-4 px-2">
          <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{' '}
            <a
              href="https://x.com/khabubundivhu"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4">
              khabubundivhu
            </a>
            . The source code is available on{' '}
            <a
              href="https://github/github.com/khabubundivhu/zapflow"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4">
              GitHub
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
};
