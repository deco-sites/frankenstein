import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";

import IconHome from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/home.tsx";
import IconBook from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/book.tsx";
import IconBrandHipchat from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-hipchat.tsx";
import IconShoppingCart from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/shopping-cart.tsx";

import type { ComponentChildren } from "preact";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <span class="text-primary-content">
      {isIcon(item)
        ? (
          <div class="border-base-100 border border-solid py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </span>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 sm:py-12 sm:px-0 ${_class}`}>{children}</div>;
}

function Footer() {
  return (
    <footer class="w-full bg-slate-200">
      <div>
        <div class="container w-full">
          <FooterContainer class="flex justify-center w-full ">
            <ul class="flex w-full md:w-[768px] ml-10 mr-10 items-center justify-between text-sm font-sm">
              <li>
                <a
                  href=""
                  target=""
                  rel="noopener noreferrer"
                  aria-label="Home logo"
                >
                  <div class="flex flex-col items-center hover:text-purple-900 fill-current text-slate-400">
                    <IconHome class="w-9 h-9" />
                    <span>Home</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href=""
                  target=""
                  rel="noopener noreferrer"
                  aria-label="Catalog logo"
                >
                  <div class="flex flex-col items-center hover:text-purple-900 fill-current text-slate-400">
                    <IconBook class="w-9 h-9" />
                    <span>Catalog</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href=""
                  target=""
                  rel="noopener noreferrer"
                  aria-label="Chat logo"
                >
                  <div class="flex flex-col items-center hover:text-purple-900 fill-current text-slate-400">
                    <IconBrandHipchat class="w-9 h-9" />
                    <span>Chat</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href=""
                  target=""
                  rel="noopener noreferrer"
                  aria-label="Cart logo"
                >
                  <div class="flex flex-col items-center hover:text-purple-900 fill-current text-slate-400">
                    <IconShoppingCart class="w-9 h-9" />
                    <span>Cart</span>
                  </div>
                </a>
              </li>
            </ul>
          </FooterContainer>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
